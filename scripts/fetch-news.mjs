<section class="news-controls">
  <input id="newsSearch" type="search" placeholder="キーワードで検索">

  <select id="countryFilter">
    <option value="all">すべての国</option>
    <option value="germany">ドイツ</option>
    <option value="japan">日本</option>
    <option value="eu">EU</option>
  </select>

  <select id="cityFilter">
    <option value="all">すべての都市</option>
    <option value="duesseldorf">Düsseldorf</option>
    <option value="nrw">NRW</option>
    <option value="berlin">Berlin</option>
    <option value="frankfurt">Frankfurt</option>
    <option value="nationwide">全国</option>
  </select>

  <select id="categoryFilter">
    <option value="all">すべてのカテゴリ</option>
    <option value="life">生活</option>
    <option value="transport">交通</option>
    <option value="visa">ビザ・行政</option>
    <option value="law">法律</option>
    <option value="work">仕事・経済</option>
    <option value="medical">医療</option>
    <option value="travel">観光・イベント</option>
    <option value="safety">災害・安全</option>
  </select>

  <select id="importanceFilter">
    <option value="all">すべての重要度</option>
    <option value="important">重要</option>
    <option value="impact">生活影響あり</option>
    <option value="check">要確認</option>
    <option value="normal">通常</option>
  </select>
</section>

<section id="newsGrid" class="news-grid"></section>

<script src="../../assets/js/news.js"></script>