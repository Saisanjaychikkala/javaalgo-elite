// LocalStorage Manager for progress, bookmarks, and user settings

const STORAGE_KEYS = {
  COMPLETED: 'javaalgo_completed_problems',
  BOOKMARKED: 'javaalgo_bookmarked_problems',
  STATS: 'javaalgo_user_stats'
};

export const Storage = {
  getCompleted() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.COMPLETED);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Failed to load completed problems', e);
      return [];
    }
  },

  isCompleted(problemId) {
    const list = this.getCompleted();
    return list.includes(problemId);
  },

  toggleCompleted(problemId) {
    let list = this.getCompleted();
    const index = list.indexOf(problemId);
    let isNowCompleted = false;
    if (index > -1) {
      list.splice(index, 1);
      isNowCompleted = false;
    } else {
      list.push(problemId);
      isNowCompleted = true;
    }
    localStorage.setItem(STORAGE_KEYS.COMPLETED, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent('progress-updated', { detail: { problemId, isNowCompleted, total: list.length } }));
    return isNowCompleted;
  },

  getBookmarked() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BOOKMARKED);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  toggleBookmarked(problemId) {
    let list = this.getBookmarked();
    const index = list.indexOf(problemId);
    let isNowBookmarked = false;
    if (index > -1) {
      list.splice(index, 1);
    } else {
      list.push(problemId);
      isNowBookmarked = true;
    }
    localStorage.setItem(STORAGE_KEYS.BOOKMARKED, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent('bookmarks-updated', { detail: { problemId, isNowBookmarked } }));
    return isNowBookmarked;
  },

  resetProgress() {
    localStorage.removeItem(STORAGE_KEYS.COMPLETED);
    localStorage.removeItem(STORAGE_KEYS.BOOKMARKED);
    window.dispatchEvent(new CustomEvent('progress-updated', { detail: { total: 0 } }));
  }
};
