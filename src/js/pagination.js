// ページネーション機能
class Pagination {
  constructor(itemsPerPage = 18) {
    this.itemsPerPage = itemsPerPage;
    this.currentPage = 1;
    this.items = [];
    this.filteredItems = [];
  }

  init() {
    this.items = Array.from(document.querySelectorAll('.faq-item'));
    this.filteredItems = this.items;
    this.render();
  }

  setFilteredItems(items) {
    this.filteredItems = items;
    this.currentPage = 1;
    this.render();
  }

  getTotalPages() {
    return Math.ceil(this.filteredItems.length / this.itemsPerPage);
  }

  showPage(page) {
    this.currentPage = page;

    // すべてのアイテムを非表示
    this.items.forEach(item => {
      item.classList.remove('visible');
    });

    // 現在のページのアイテムのみ表示
    const start = (page - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    const pageItems = this.filteredItems.slice(start, end);

    pageItems.forEach(item => {
      item.classList.add('visible');
    });

    this.renderPagination();

    // ページトップにスクロール
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  renderPagination() {
    const paginationEl = document.getElementById('pagination');
    if (!paginationEl) return;

    const totalPages = this.getTotalPages();

    if (totalPages <= 1) {
      paginationEl.innerHTML = '';
      return;
    }

    let html = '';

    // 前へボタン
    html += `<button class="pagination-btn pagination-arrow" onclick="window.pagination.showPage(${this.currentPage - 1})" ${this.currentPage === 1 ? 'disabled' : ''}>‹</button>`;

    // ページ番号ボタン
    const pages = this.getPageNumbers(totalPages);
    pages.forEach(page => {
      if (page === '...') {
        html += `<span class="pagination-ellipsis">…</span>`;
      } else {
        const isActive = page === this.currentPage ? 'active' : '';
        html += `<button class="pagination-btn ${isActive}" onclick="window.pagination.showPage(${page})">${page}</button>`;
      }
    });

    // 次へボタン
    html += `<button class="pagination-btn pagination-arrow" onclick="window.pagination.showPage(${this.currentPage + 1})" ${this.currentPage === totalPages ? 'disabled' : ''}>›</button>`;

    paginationEl.innerHTML = html;
  }

  getPageNumbers(totalPages) {
    const current = this.currentPage;
    const pages = [];

    if (totalPages <= 7) {
      // 7ページ以下の場合はすべて表示
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // 8ページ以上の場合は省略記号を含める
      if (current <= 3) {
        // 先頭付近
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (current >= totalPages - 2) {
        // 末尾付近
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        // 中間
        pages.push(1, '...', current - 1, current, current + 1, '...', totalPages);
      }
    }

    return pages;
  }

  render() {
    this.showPage(this.currentPage);
  }
}

// グローバルに公開
window.pagination = new Pagination(18);

// DOM読み込み後に初期化
document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('faqList')) {
    window.pagination.init();
  }
});
