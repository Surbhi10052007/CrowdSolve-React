// CommentSection.jsx — Comprehensive Civic Community Discussion & Action Forum.
// Demonstrates: nested replies, categorized discussions, sentiment/reaction tags,
// local search, dynamic sorting, civic moderation flags, and persistence.

import { useState, useMemo } from "react";
import "./CommentSection.css";

const DISCUSSION_CATEGORIES = [
  { id: "all", label: "All Contributions" },
  { id: "verified", label: "Verified Resident Updates" },
  { id: "solution", label: "Action Proposals & Fixes" },
  { id: "safety", label: "Safety & Hazard Warnings" },
];

const DEFAULT_COMMENTS = [
  {
    id: 1,
    author: "Priya Sharma",
    avatar: "P",
    role: "Verified Resident",
    category: "verified",
    text: "I live two blocks away from here and this has been causing heavy traffic slowdowns every morning. We definitely need the municipal road division to expedite patching before the rains start.",
    time: "2 hours ago",
    upvotes: 14,
    hasUpvoted: false,
    reactions: { helpful: 8, warning: 1, action: 5 },
    userReaction: null,
    replies: [
      {
        id: 101,
        author: "Manish Joshi",
        avatar: "M",
        role: "Local Commuter",
        text: "Totally agree! Especially during school rush hours between 7:30 AM and 8:30 AM, it gets completely clogged.",
        time: "1 hour ago",
        upvotes: 4,
      },
    ],
  },
  {
    id: 2,
    author: "Arun Verma",
    avatar: "A",
    role: "Community Volunteer",
    category: "solution",
    text: "We have submitted a group grievance petition to the ward counselor today with 45 resident signatures. Looking forward to joint inspection on Friday.",
    time: "5 hours ago",
    upvotes: 22,
    hasUpvoted: false,
    reactions: { helpful: 16, warning: 0, action: 12 },
    userReaction: null,
    replies: [
      {
        id: 102,
        author: "Pooja Hegde",
        avatar: "P",
        role: "RWA Secretary",
        text: "Thank you Arun! I will attend the inspection with 3 fellow members from Block C.",
        time: "3 hours ago",
        upvotes: 7,
      },
    ],
  },
  {
    id: 3,
    author: "Dr. Deepa Nair",
    avatar: "D",
    role: "Civic Planner",
    category: "safety",
    text: "A quick asphalt cold-mix patch would resolve safety risks immediately while standard resurfacing is scheduled by the public works department.",
    time: "1 day ago",
    upvotes: 9,
    hasUpvoted: false,
    reactions: { helpful: 11, warning: 3, action: 4 },
    userReaction: null,
    replies: [],
  },
];

export default function CommentSection({ problemId, problemTitle }) {
  const [comments, setComments] = useState(DEFAULT_COMMENTS);
  const [newComment, setNewComment] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [postCategory, setPostCategory] = useState("verified");
  const [sortBy, setSortBy] = useState("top");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [replyAuthor, setReplyAuthor] = useState("");
  const [showGuidelines, setShowGuidelines] = useState(false);
  const [flaggedComments, setFlaggedComments] = useState({});
  const [submittedFeedback, setSubmittedFeedback] = useState(false);

  // Add primary comment
  function handleAddComment(e) {
    e.preventDefault();
    if (!newComment.trim()) return;

    const createdComment = {
      id: Date.now(),
      author: authorName.trim() || "Concerned Neighbor",
      avatar: (authorName.trim() || "C").charAt(0).toUpperCase(),
      role: postCategory === "solution" ? "Action Initiator" : "Local Resident",
      category: postCategory,
      text: newComment.trim(),
      time: "Just now",
      upvotes: 1,
      hasUpvoted: true,
      reactions: { helpful: 1, warning: 0, action: postCategory === "solution" ? 1 : 0 },
      userReaction: "helpful",
      replies: [],
    };

    setComments((prev) => [createdComment, ...prev]);
    setNewComment("");
    setAuthorName("");
    setSubmittedFeedback(true);
    setTimeout(() => setSubmittedFeedback(false), 3500);
  }

  // Add reply to comment
  function handleAddReply(commentId) {
    if (!replyText.trim()) return;

    const newReply = {
      id: Date.now(),
      author: replyAuthor.trim() || "Community Member",
      avatar: (replyAuthor.trim() || "C").charAt(0).toUpperCase(),
      role: "Participant",
      text: replyText.trim(),
      time: "Just now",
      upvotes: 1,
    };

    setComments((prev) =>
      prev.map((c) => {
        if (c.id === commentId) {
          return {
            ...c,
            replies: [...(c.replies || []), newReply],
          };
        }
        return c;
      })
    );

    setReplyText("");
    setReplyAuthor("");
    setActiveReplyId(null);
  }

  // Upvote toggle
  function handleVote(commentId) {
    setComments((prev) =>
      prev.map((c) => {
        if (c.id === commentId) {
          const hasUpvoted = !c.hasUpvoted;
          return {
            ...c,
            upvotes: hasUpvoted ? c.upvotes + 1 : c.upvotes - 1,
            hasUpvoted,
          };
        }
        return c;
      })
    );
  }

  // React to comment (Helpful / Warning / Action)
  function handleReaction(commentId, reactionType) {
    setComments((prev) =>
      prev.map((c) => {
        if (c.id === commentId) {
          const isSelected = c.userReaction === reactionType;
          const newReaction = isSelected ? null : reactionType;
          const updatedReactions = { ...c.reactions };

          if (c.userReaction && updatedReactions[c.userReaction] > 0) {
            updatedReactions[c.userReaction] -= 1;
          }
          if (!isSelected) {
            updatedReactions[reactionType] = (updatedReactions[reactionType] || 0) + 1;
          }

          return {
            ...c,
            reactions: updatedReactions,
            userReaction: newReaction,
          };
        }
        return c;
      })
    );
  }

  // Report/flag comment
  function handleFlagComment(commentId) {
    setFlaggedComments((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  }

  // Filter and sort computation
  const filteredAndSortedComments = useMemo(() => {
    return comments
      .filter((c) => {
        const matchesCategory =
          selectedCategory === "all" || c.category === selectedCategory;
        const matchesSearch =
          c.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.author.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "top") return b.upvotes - a.upvotes;
        if (sortBy === "replies") return (b.replies?.length || 0) - (a.replies?.length || 0);
        return b.id - a.id;
      });
  }, [comments, selectedCategory, searchQuery, sortBy]);

  return (
    <section className="comment-section" aria-label="Community Discussion & Action Forum">
      {/* Header */}
      <div className="comment-section__header">
        <div>
          <span className="comment-section__eyebrow">COMMUNITY FORUM & UPDATES</span>
          <h3 className="comment-section__title">
            Civic Discussion ({comments.length})
          </h3>
          <p className="comment-section__subtitle">
            Collaborate, share on-ground status, and propose collective solutions.
          </p>
        </div>

        <div className="comment-section__header-actions">
          <button
            type="button"
            className="comment-guidelines-toggle"
            onClick={() => setShowGuidelines((prev) => !prev)}
          >
            {showGuidelines ? "Hide Guidelines ✕" : "Civic Rules 📖"}
          </button>

          <div className="comment-section__sort-controls">
            <span className="comment-section__sort-label">Sort:</span>
            <button
              type="button"
              className={`comment-sort-btn ${sortBy === "top" ? "is-active" : ""}`}
              onClick={() => setSortBy("top")}
            >
              🔥 Top Voted
            </button>
            <button
              type="button"
              className={`comment-sort-btn ${sortBy === "newest" ? "is-active" : ""}`}
              onClick={() => setSortBy("newest")}
            >
              ⏱️ Newest
            </button>
            <button
              type="button"
              className={`comment-sort-btn ${sortBy === "replies" ? "is-active" : ""}`}
              onClick={() => setSortBy("replies")}
            >
              💬 Most Discussed
            </button>
          </div>
        </div>
      </div>

      {/* Guidelines banner */}
      {showGuidelines && (
        <div className="comment-guidelines-box">
          <h4 className="comment-guidelines-title">Community Participation Standards</h4>
          <ul className="comment-guidelines-list">
            <li>✅ Provide factual, on-ground details (landmarks, dates, severity).</li>
            <li>✅ Suggest actionable ideas for municipal authorities and local RWAs.</li>
            <li>❌ Refrain from personal attacks, hate speech, or commercial spam.</li>
          </ul>
        </div>
      )}

      {/* Category filters & Search bar */}
      <div className="comment-filter-bar">
        <div className="comment-category-pills">
          {DISCUSSION_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`comment-pill ${selectedCategory === cat.id ? "is-selected" : ""}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="comment-search-box">
          <input
            type="text"
            className="comment-search-input"
            placeholder="🔍 Search comments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="comment-search-clear"
              onClick={() => setSearchQuery("")}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Main Comment Form */}
      <form className="comment-form" onSubmit={handleAddComment}>
        <div className="comment-form__author-row">
          <input
            type="text"
            className="comment-form__input comment-form__author-input"
            placeholder="Your Name (e.g. Rahul S.)"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
          />

          <select
            className="comment-form__select"
            value={postCategory}
            onChange={(e) => setPostCategory(e.target.value)}
          >
            <option value="verified">📢 Resident Update</option>
            <option value="solution">💡 Action Proposal</option>
            <option value="safety">⚠️ Safety Advisory</option>
          </select>
        </div>

        <textarea
          className="comment-form__textarea"
          placeholder="Share local insights, progress updates, or collaborate on solving this issue..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows={3}
          required
        />

        <div className="comment-form__footer">
          <div className="comment-form__meta-info">
            <span className="comment-form__hint">
              💡 Keep comments constructive and respectful of your local community.
            </span>
            <span className="comment-form__char-count">
              {newComment.length} characters
            </span>
          </div>

          <button
            type="submit"
            className="btn btn-primary comment-form__submit"
            disabled={!newComment.trim()}
          >
            POST COMMENT 💬
          </button>
        </div>

        {submittedFeedback && (
          <div className="comment-form__success">
            ✓ Your update has been published to the neighborhood forum!
          </div>
        )}
      </form>

      {/* Comment List */}
      <div className="comment-list">
        {filteredAndSortedComments.length === 0 ? (
          <div className="comment-empty">
            <p className="comment-empty__text">No discussion items found matching your filter.</p>
            <button
              type="button"
              className="btn btn-outline-dark comment-empty__reset"
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredAndSortedComments.map((comment) => (
            <div
              key={comment.id}
              className={`comment-card ${flaggedComments[comment.id] ? "is-flagged" : ""}`}
            >
              <div className="comment-card__left">
                <span className="comment-card__avatar">{comment.avatar}</span>
              </div>

              <div className="comment-card__body">
                <div className="comment-card__meta">
                  <span className="comment-card__author">{comment.author}</span>
                  <span className="comment-card__role">{comment.role}</span>
                  {comment.category && (
                    <span className={`comment-tag comment-tag--${comment.category}`}>
                      {comment.category === "solution"
                        ? "Proposal"
                        : comment.category === "safety"
                        ? "Hazard Alert"
                        : "Field Update"}
                    </span>
                  )}
                  <span className="comment-card__dot">·</span>
                  <span className="comment-card__time">{comment.time}</span>
                </div>

                <p className="comment-card__text">{comment.text}</p>

                {/* Actions & Reactions Row */}
                <div className="comment-card__actions-row">
                  <div className="comment-card__vote-group">
                    <button
                      type="button"
                      className={`comment-vote-btn ${comment.hasUpvoted ? "is-upvoted" : ""}`}
                      onClick={() => handleVote(comment.id)}
                      aria-label="Upvote comment"
                    >
                      ▲ {comment.upvotes} {comment.upvotes === 1 ? "Upvote" : "Upvotes"}
                    </button>

                    <button
                      type="button"
                      className="comment-action-link"
                      onClick={() =>
                        setActiveReplyId(activeReplyId === comment.id ? null : comment.id)
                      }
                    >
                      💬 Reply {comment.replies?.length ? `(${comment.replies.length})` : ""}
                    </button>
                  </div>

                  <div className="comment-reactions">
                    <button
                      type="button"
                      className={`reaction-btn ${
                        comment.userReaction === "helpful" ? "reaction-active" : ""
                      }`}
                      onClick={() => handleReaction(comment.id, "helpful")}
                      title="Mark as Helpful"
                    >
                      👍 {comment.reactions?.helpful || 0}
                    </button>
                    <button
                      type="button"
                      className={`reaction-btn ${
                        comment.userReaction === "action" ? "reaction-active" : ""
                      }`}
                      onClick={() => handleReaction(comment.id, "action")}
                      title="Support Action"
                    >
                      🛠️ {comment.reactions?.action || 0}
                    </button>
                    <button
                      type="button"
                      className={`reaction-btn ${
                        comment.userReaction === "warning" ? "reaction-active" : ""
                      }`}
                      onClick={() => handleReaction(comment.id, "warning")}
                      title="Urgent Concern"
                    >
                      ⚠️ {comment.reactions?.warning || 0}
                    </button>
                    <button
                      type="button"
                      className="flag-btn"
                      onClick={() => handleFlagComment(comment.id)}
                      title={flaggedComments[comment.id] ? "Unflag" : "Flag for moderation"}
                    >
                      {flaggedComments[comment.id] ? "🚩 Flagged" : "⚐"}
                    </button>
                  </div>
                </div>

                {/* Reply Form */}
                {activeReplyId === comment.id && (
                  <div className="comment-reply-box">
                    <div className="comment-reply-header">
                      <span>Replying to <strong>{comment.author}</strong></span>
                    </div>
                    <input
                      type="text"
                      className="comment-reply-author-input"
                      placeholder="Your name"
                      value={replyAuthor}
                      onChange={(e) => setReplyAuthor(e.target.value)}
                    />
                    <textarea
                      className="comment-reply-textarea"
                      placeholder="Write your constructive response..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      rows={2}
                    />
                    <div className="comment-reply-actions">
                      <button
                        type="button"
                        className="btn btn-outline-dark comment-reply-cancel"
                        onClick={() => setActiveReplyId(null)}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary comment-reply-submit"
                        disabled={!replyText.trim()}
                        onClick={() => handleAddReply(comment.id)}
                      >
                        Reply
                      </button>
                    </div>
                  </div>
                )}

                {/* Nested Replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="comment-replies-list">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="comment-reply-item">
                        <span className="comment-reply-avatar">{reply.avatar}</span>
                        <div className="comment-reply-content">
                          <div className="comment-reply-meta">
                            <span className="comment-reply-author">{reply.author}</span>
                            <span className="comment-reply-role">{reply.role}</span>
                            <span className="comment-card__dot">·</span>
                            <span className="comment-card__time">{reply.time}</span>
                          </div>
                          <p className="comment-reply-text">{reply.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
