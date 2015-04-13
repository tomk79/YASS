**YASS**は、[FESS](http://tomk79.github.io/FESS/)に[SMACSS](https://smacss.com/ja)、[BEM](http://bem.info/)のコンセプトを取り入れた、CSSフレームワークです。

## 基本原則

YASSはSMACSSのカテゴリー分類を拝借し次の5つのカテゴリーで構成されます。

1. Base - reset/normalize/base...
2. Layout
  1. Structure - header/main/sideber/footer...
  2. Grid - grid...
3. Module
  1. Component - heading/button/link/...
  2. Utility - clearfix/display/margin...
4. Theme - theme...
5. State

### Base

Reset.cssやNormalize.cssなどを用いたブラウザのデフォルトスタイルの初期化や、プロジェクトにおける基本的なスタイルを定義します。
ページの下地としての全体の背景や、基本的なタイポグラフィなどが該当します。
Baseの中にクラスを指定したスタイルを定義してはいけません。

### Layout

#### 1. Structure
ページを構成するヘッダーやメインのコンテンツエリア、サイドバーやフッターといったプロジェクト共通のコンテナーブロックのスタイルを定義します。

#### 2. Grid
[Bootstrapのグリッドシステム](http://getbootstrap.com/css/#grid)を拝借。


### Module

OOCSSのコンセプトを元に、プロジェクトにおける繰り返されるビジュアルパターンをすべて**Module**と定義します。

YASSでのモジュールは、さらに次のレイヤーに分けられます。

#### 1. Component

再利用できるパターンとして、小さな単位のモジュールを定義します。
テーブル、タイポグラフィ、リンク等のデフォルトのタグにスタイルを当てる場合もこちらに定義します。

一般的によく使われるパターンであり、例えば[BootstrapのComponentカテゴリ](http://getbootstrap.com/components/)などに見られる`button`などが該当します。

#### 2. Utility

Componentのモディファイアで解決することが難しい・適切では無い、わずかなスタイルの調整のための便利クラスなどを定義します。

clearfixテクニックのためのルールセットが定義されているヘルパークラスも、このレイヤーに含めます。

### Theme

Themeはサイトの表面的なデザイン変更を行います。

また単一の装飾のスタイルなどもテーマとして定義します。

### State

Stateは、モジュールやレイアウトを拡張し、特定の状態によってスタイルを上書きします。

状態の切り替えはJavaScriptで制御するため、状態ルールはJavaScriptに依存すると言えるでしょう。

## 命名規則

### MindBEMding

[BEM](http://bem.info/)システムのシンタックスである、**Block**、**Element**、**Modifier**に分類して構成される規則を採用します。

YASSでは、オリジナルのBEMのシンタックスではなく、[MindBEMding](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)
のアイデアを基本的にそのまま取り入れています。

```css
.block {}
.block__element {}
.block--modifier {}
```

Modifierの命名の派生パターンとして、JavaScriptで操作されるような「状態」を表すようなModifierについては、SMACSSの**State**パターンの命名を拝借し、'is-*'プレフィックスを付与し、`.is-active`というようにすることもできます。

```html
<button class="c-button is-active">Save</button>
```

```css
.c-button { ... }
.c-button.is-active { ... }
```

このアイデアを採用する場合の原則として、`.is-active`そのものにルールを持たせるのは**禁止**します。これは`.is-active`そのものが持つルールが、
他のモジュールのModifierのスタイルを汚染してしまうのを防ぐためです。


### プレフィックス

役割を明確にするためにプレフィックスをつけることを推奨します。

- Layout - `.l-*`
- Component - `.c-*`
- Utility   - `.u-*`
- Theme   - `.t-*`
- State   - `.is-*`

*Note:*  
これらの命名規則は、あなたのプロジェクトが持つオリジナルの命名規則に従い、キャメルケースなどを組み合わせたものでも構いませんが、必ず**命名に一貫性を保つ**ようにしてください。

## ファイル・ディレクトリ構成

基本原則のレイヤー構成に従い、下記のような構成を前提とします。

SassやStylusのようなCSSプリプロセッサやビルドツールを使ってCSSファイルを結合できる環境にあれば、次のようにディレクトリを分割して管理することを推奨します。
次の例は、Sassを採用した場合の例です。

```
yass
├── mixins
│   └── _mixin.scss
├── base
│   ├── _base.scss
│   └── _reset.scss
├── layout
│   ├── structure
│   │   ├── _header.scss
│   │   ├── _footer.scss
│   │   ├── _main.scss
│   │   └── _sidebar.scss
│   └── grid
│       └── _grid.scss
├─── module
│   ├── component
│   │   ├── _button.scss
│   │   ├── _dialog.scss
│   │   ├── _grid.scss
│   │   └── _media.scss
│   └── utility
│       ├── _align.scss
│       ├── _clearfix.scss
│       ├── _margin.scss
│       ├── _position.scss
│       ├── _size.scss
│       └── _text.scss
└── theme
    └── _color.scss
```

モジュール単位でファイルを分割することによって、ページ単位またはプロジェクト単位でのモジュールの追加・削除の管理が容易になります。

これらを統括するための`style.scss`のようなファイルからは次のように参照します。

```scss

// ==========================================================================
// mixin
// ==========================================================================

@import "YASS/mixins";

// ==========================================================================
// base
// ==========================================================================

@import "YASS/base/_base";
@import "YASS/base/_reset";

// ==========================================================================
// Layout
// ==========================================================================

// -----------------------------------------------------------------
// Structure
// -----------------------------------------------------------------
@import "YASS/layout/structure/_header";
@import "YASS/layout/structure/_footer";
@import "YASS/layout/structure/_main";
@import "YASS/layout/structure/_sidebar";

// -----------------------------------------------------------------
// Grid
// -----------------------------------------------------------------
@import "YASS/layout/grid/_grid";

// ==========================================================================
// Module
// ==========================================================================

// -----------------------------------------------------------------
// Component
// -----------------------------------------------------------------

@import "YASS/module/component/_button";
@import "YASS/module/component/_dialog";
@import "YASS/module/component/_media";

// -----------------------------------------------------------------
// Utility
// -----------------------------------------------------------------

@import "YASS/module/utility/_align";
@import "YASS/module/utility/_clearfix";
@import "YASS/module/utility/_margin";
@import "YASS/module/utility/_position";
@import "YASS/module/utility/_size";

// ==========================================================================
// Theme
// ==========================================================================

@import "YASS/theme/_theme";
```

### Layout、Module、Themeのカスケーディング

原則として、モジュール間のカスケーディング、他のモジュールを親とするセレクタを用いたカスケーディングは**禁止**とします。

特に同一レイヤーにおけるモジュール間のカスケーディング、例えば、次のような複数のセレクタを用いたカスケーディングは好ましくありません。

```css
// Component
.c-button {
  ...
}
.c-media .c-button {
  ...
}

// Layout
.l-main {
  ...
}
.l-main .c-button {
  ...
}
```

なぜならば、そのレイヤーにおいて、特定のモジュールに依存することなく、モジュールとして独立して再利用できるべきであり、混在させることによって他の開発者が予想しない挙動になるべきではないためです。
次のように**Element**や、Componentレイヤーの**Modifier**によって拡張することによって解決することができる場合があります。

#### ComponentのModifier

```html
<div class="c-media">
  <img src="user.jpg" class="c-media__image">
  <div class="c-media__body">
    <div class="c-button c-button--rev">...</div>
  </div>
</div>
```

```css
// Component
.c-button {
  float: left;
  margin-right: 10px;
}

.c-button--rev {
  float: right;
  margin-right: 0; // Cancel 'c-button' value
  margin-left: 10px;
}
```

このように解決できた場合には、詳細度を強くすることを防ぐことができます。

ただし以下のように他のコンポーネントに依存するようなModifierを作る事は**禁止**とします。

#### 他のコンポーネントに依存するModifier

```html
<div class="c-media">
  <img src="user.jpg" class="c-media__image">
  <div class="c-media__body">
    <div class="c-button c-button--abs">...</div>
  </div>
</div>
```

```css
// Component
.c-media {
  position: relative;
}

.c-button--abs {
  position: absolute; //.c-mediaに依存している。
  top: 0;
  right: 0;
}
```

上記の様な場合はBlockにelementを追加し拡張することによって解決することが望ましいです。

#### Blockのelement

```html
<div class="c-media">
  <img src="user.jpg" class="c-media__image">
  <div class="c-media__body">
    <div class="c-media__abs c-button">...</div>
  </div>
</div>
```

```css
// Component
.c-media {
  position: relative;
}

.c-media__abs {
  position: absolute;
  top: 0;
  right: 0;
}
```

例外として、Themeカテゴリーにおけるカスケーディング、例えば、次のようなテーマがレイアウトやComponentのモジュールを変更することは許容します。

```css
// Layout
#l-header {
}

.t-border #l-header {
  border: 1px solid blue;
}
```

## CSSプリプロセッサのExtend

CSSプリプロセッサの多くが持つ、セレクタを継承するためのExtendは、原則そのモジュールで完結する継承以外では利用を禁止します。

カテゴリーやレイヤー超えてExtendによる継承をおこなった場合、YASSの構成・設計は破綻し、カスケーディングルールも複雑にしてしまう可能性があるためです。

以下は例外として、許容されるパターンをあげます。

### モジュールで完結するExtend

次のようなbuttonモジュールがあったとします。

```scss
.button {
  display: inline-block;
  padding: 0.5em 1em;
  cursor: pointer;
}
.button--primary {
  background-color: #CCAA00;
}
```

```html
<a href="#save" class="button button--primary">Save</a>
```

YASSの構想では、このようなマルチクラスパターンを基本としていますが、次のようなExtendによってシングルクラスにすることができます。

```scss
.button {
  display: inline-block;
  padding: 0.5em 1em;
  cursor: pointer;
}
.button--primary {
  @extend .button
  background-color: #CCAA00;
  color: #FFFFFF;
}
.button--secondary {
  @extend .button
  background-color: #FFCC00;
}

// Compiled
// .button,.button--primary {
//   display: inline-block;
//   padding: 0.5em 1em;
//   cursor: pointer;
// }
// .button--primary {
//   background-color: #CCAA00;
// }
```

```html
<a href="#save" class="button--primary">Save</a>
```

このようにモジュール内で完結をする限りは、管理が煩雑になりにくいため許容します。

### ThemeによるExtend

```html
<a href="#" class="c-btn">ボタン</a>
<h2 class="c-heding2">見出し</h2>
```

```scss
.t-gradient-gray {
  background-image: linear-gradient(top, #F2F2F2, #C9C9C9);
}
.c-btn {
  @extend .t-gradient-gray
}
.c-heding2 {
  @extend .t-gradient-gray
}
// Compiled
// .c-btn {
//   background-image: linear-gradient(top, #F2F2F2, #C9C9C9);
// }
// .c-heding2 {
//   background-image: linear-gradient(top, #F2F2F2, #C9C9C9);
// }
```
