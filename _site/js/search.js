// 検索機能とサジェスト
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('searchInput');
  const searchSuggestions = document.getElementById('searchSuggestions');

  if (!searchInput || !searchSuggestions) return;

  let debounceTimer;

  // 検索サジェスト表示
  searchInput.addEventListener('input', function(e) {
    clearTimeout(debounceTimer);

    const searchTerm = e.target.value.trim();

    if (searchTerm.length < 1) {
      searchSuggestions.classList.remove('active');
      searchSuggestions.innerHTML = '';
      return;
    }

    debounceTimer = setTimeout(() => {
      showSuggestions(searchTerm);
    }, 200);
  });

  // Enterキーで検索結果ページへ
  searchInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      const searchTerm = searchInput.value.trim();
      if (searchTerm) {
        window.location.href = `/search.html?q=${encodeURIComponent(searchTerm)}`;
      }
    }
  });

  // サジェスト表示関数
  function showSuggestions(searchTerm) {
    const lowerSearchTerm = searchTerm.toLowerCase();

    // FAQデータから検索
    const matches = window.faqData.filter(faq => {
      return faq.title.toLowerCase().includes(lowerSearchTerm) ||
             faq.category.toLowerCase().includes(lowerSearchTerm);
    });

    if (matches.length === 0) {
      searchSuggestions.classList.remove('active');
      return;
    }

    // 最大10件まで表示
    const displayMatches = matches.slice(0, 10);

    let html = `<div class="search-suggestions-count">${matches.length} 件</div>`;

    displayMatches.forEach(faq => {
      html += `
        <div class="search-suggestion-item" data-url="${faq.url}">
          <div class="search-suggestion-title">${faq.title}</div>
          <div class="search-suggestion-category">${faq.category}</div>
        </div>
      `;
    });

    searchSuggestions.innerHTML = html;
    searchSuggestions.classList.add('active');

    // サジェストアイテムのクリックイベント
    document.querySelectorAll('.search-suggestion-item').forEach(item => {
      item.addEventListener('click', function() {
        window.location.href = this.getAttribute('data-url');
      });
    });
  }

  // サジェスト外をクリックしたら閉じる
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.search-box')) {
      searchSuggestions.classList.remove('active');
    }
  });

  // フォーカス時に再表示
  searchInput.addEventListener('focus', function() {
    if (this.value.trim().length > 0) {
      showSuggestions(this.value.trim());
    }
  });
});
