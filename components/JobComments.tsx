'use client';

import { useState } from 'react';

interface JobCommentsProps {
  jobId: string;
}

interface Comment {
  id: string;
  author: string;
  avatar: string;
  timestamp: string;
  content: string;
  replies?: Comment[];
}

// Mock comments data
const mockComments: Comment[] = [
  {
    id: '1',
    author: 'Sarah Chen',
    avatar: 'SC',
    timestamp: '2 hours ago',
    content: 'Great company to work for! The team is very supportive and the work environment is inclusive.',
  },
  {
    id: '2',
    author: 'Michael Johnson',
    avatar: 'MJ',
    timestamp: '1 day ago',
    content: 'Anyone know what the interview process looks like for this role?',
  },
  {
    id: '3',
    author: 'Emma Wilson',
    avatar: 'EW',
    timestamp: '3 days ago',
    content: 'Excellent benefits package. Highly recommend applying!',
  },
];

export default function JobComments({ jobId }: JobCommentsProps) {
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [newComment, setNewComment] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  const handlePostComment = async () => {
    if (!newComment.trim()) return;

    setIsPosting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      const comment: Comment = {
        id: Date.now().toString(),
        author: 'You',
        avatar: 'YU',
        timestamp: 'just now',
        content: newComment,
      };

      setComments([comment, ...comments]);
      setNewComment('');
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Comment Form */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Share your experience
        </label>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Share your thoughts about this job or company..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 resize-none"
          rows={3}
        />
        <button
          onClick={handlePostComment}
          disabled={isPosting || !newComment.trim()}
          className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isPosting ? 'Posting...' : 'Post Comment'}
        </button>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex gap-3">
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-indigo-400 to-indigo-600 text-white flex items-center justify-center font-semibold text-sm shrink-0">
                {comment.avatar}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-gray-900">{comment.author}</h4>
                  <span className="text-sm text-gray-500">{comment.timestamp}</span>
                </div>
                <p className="text-gray-700 mt-1">{comment.content}</p>
                <button className="mt-2 text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                  Reply
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {comments.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No comments yet. Be the first to share your thoughts!</p>
        </div>
      )}
    </div>
  );
}
