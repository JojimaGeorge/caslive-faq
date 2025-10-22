// カテゴリーフィルター機能
document.addEventListener('DOMContentLoaded', function() {
  const categoryButtons = document.querySelectorAll('.category-btn');
  const currentCategoryEl = document.getElementById('currentCategory');
  const searchInput = document.getElementById('searchInput');

  if (categoryButtons.length === 0) return;

  categoryButtons.forEach(button => {
    button.addEventListener('click', function() {
      const category = this.getAttribute('data-category');

      // アクティブ状態を更新
      categoryButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      // カテゴリータイトルを更新
      if (currentCategoryEl) {
        currentCategoryEl.textContent = category;
      }

      // 検索をクリア
      if (searchInput) {
        searchInput.value = '';
      }

      // フィルタリング
      filterByCategory(category);
    });
  });

  function filterByCategory(category) {
    const allItems = Array.from(document.querySelectorAll('.faq-item'));
    let filteredItems;

    if (category === 'すべて') {
      filteredItems = allItems;
    } else {
      filteredItems = allItems.filter(item => {
        return item.getAttribute('data-category') === category;
      });
    }

    // ページネーションを更新
    if (window.pagination) {
      window.pagination.setFilteredItems(filteredItems);
    }

    // ページネーションを表示
    const paginationEl = document.getElementById('pagination');
    if (paginationEl) {
      paginationEl.style.display = 'flex';
    }
  }
});
