module.exports = function(eleventyConfig) {
  // CSSとJSと画像をそのままコピー
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/images");

  // FAQコレクションを作成
  eleventyConfig.addCollection("faq", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/faq/*.md").sort((a, b) => {
      return b.date - a.date;
    });
  });

  // カテゴリー別にFAQを取得するフィルター
  eleventyConfig.addFilter("filterByCategory", function(faqs, category) {
    if (!category || category === "すべて") {
      return faqs;
    }
    return faqs.filter(faq => faq.data.category === category);
  });

  return {
    pathPrefix: "/caslive-faq/",
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "../_data"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
