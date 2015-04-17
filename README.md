**YASS**は、[FESS](http://tomk79.github.io/FESS/)に[SMACSS](https://smacss.com/ja)、[BEM](http://bem.info/)のコンセプトを取り入れたCSSの基本定義集です。

## Install

### gem

[Sass >=3.4](http://sass-lang.com/install).を使用します。
Updateまたはinstallを行ってください。

```
$ gem update sass
```

```
$ gem install sass
```

### npm

[npm](https://www.npmjs.com/)を使用して[Node.js](https://nodejs.org/)のモジュールをインストールします。

```
$ npm install
```

### Tasks

[gulp](http://gulpjs.com/)を使用します。

```
$ gulp
```

# CSS

## カテゴライズ

SMACSSのカテゴリー分類を拝借し次の5つのカテゴリーで構成されます。

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

プロジェクトにおける繰り返されるビジュアルパターンをすべて**Module**と定義します。

YASSでのモジュールは、さらに次のレイヤーに分けられます。

#### 1. Component

再利用できるパターンとして、小さな単位のモジュールを定義します。

#### 2. Utility

わずかなスタイルの調整のための便利クラスなどを定義します。

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

JavaScriptで操作されるような「状態」を表すようなModifierについては、SMACSSの**State**パターンの命名を拝借し、'is-*'プレフィックスを付与し、`.is-active`というようにすることもできます。

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

## ファイル・ディレクトリ構成

```
yass
├── _variables.scss
├── _mixins.scss
├── mixins
│   ├── _opacity.scss
│   ├── _mediaqueries.scss
│   └── ...
├── base
│   ├── _normalize.scss
│   ├── _base.scss
│   └── ...
├── layout
│   ├── structure
│   │   ├── _header.scss
│   │   ├── _footer.scss
│   │   ├── _main.scss
│   │   ├── _sidebar.scss
│   │   └── ...
│   └── grid
│       └── _grid.scss
├─── module
│   ├── component
│   │   ├── _button.scss
│   │   ├── _dialog.scss
│   │   ├── _grid.scss
│   │   ├── _media.scss
│   │   └── ...
│   └── utility
│       ├── _align.scss
│       ├── _clearfix.scss
│       ├── _margin.scss
│       ├── _position.scss
│       ├── _size.scss
│       ├── _text.scss
│       └── ...
└── theme
    ├── _color.scss
    └── ...
```
### _variables.scss

プロジェクトで使用する基本的な変数が定義されているファイル。

### _mixins.scss

各mixinファイルをincludeしたファイル。

### mixinsディレクトリ

各mixinファイルが格納されるディレクトリ

### base、layout、module、theme

上記を参考

モジュール単位でファイルを分割することによって、ページ単位またはプロジェクト単位でのモジュールの追加・削除の管理が容易になります。

これらを統括するための`style.scss`のようなファイルからは次のように参照します。

```style.scss
// ==========================================================================
// variables mixin
// ==========================================================================
@import "yass/variables";
@import "yass/mixins";

// ==========================================================================
// base
// ==========================================================================
@import "yass/base/_normalize";
@import "yass/base/_base";


// ==========================================================================
// Layout
// ==========================================================================

// -----------------------------------------------------------------
// Structure
// -----------------------------------------------------------------
@import "yass/layout/structure/_header";
@import "yass/layout/structure/_footer";
@import "yass/layout/structure/_main";
@import "yass/layout/structure/_sidebar";

// -----------------------------------------------------------------
// Grid
// -----------------------------------------------------------------
@import "yass/layout/grid/_grid";

// ==========================================================================
// Module
// ==========================================================================

// -----------------------------------------------------------------
// Component
// -----------------------------------------------------------------

@import "yass/module/component/_button";
@import "yass/module/component/_dialog";
@import "yass/module/component/_media";

// -----------------------------------------------------------------
// Utility
// -----------------------------------------------------------------

@import "yass/module/utility/_align";
@import "yass/module/utility/_clearfix";
@import "yass/module/utility/_margin";
@import "yass/module/utility/_position";
@import "yass/module/utility/_size";

// ==========================================================================
// Theme
// ==========================================================================

@import "yass/theme/_theme";
```

## 基本設計
[SASS](http://sass-lang.com/)のplaceholder selectorを利用(@extend)したシングルクラス設計が基本になっています。

次のようなbuttonモジュールがあったとします。

```scss
.c−button {
  display: inline-block;
  padding: 0.5em 1em;
  cursor: pointer;
}
.c-button--primary {
  background-color: #CCAA00;
}
```

```html
<a href="#save" class="c-button c-button--primary">Button</a>
```

YASSの構想では、このようなマルチクラスパターンを基本使用せずに、次のようなextendによるシングルクラスパターンで設計していきます。

*Note:*
マルチクラスパターンを用いた方が柔軟な設計が可能な場合などは使用してもよい。

```scss
%button {
  display: inline-block;
  padding: 0.5em 1em;
  cursor: pointer;
}
.c-button {
  @extend %button
  background-color: #CCAA00;
}
.c-button-primary {
  @extend %button
  background-color: #FFCC00;
}

// Compiled
// .c-button,.c-button-primary {
//   display: inline-block;
//   padding: 0.5em 1em;
//   cursor: pointer;
// }
// .c-button {
//   background-color: #CCAA00;
// }
// .c-button-primary {
//   background-color: #FFCC00;
// }
```

```html
<a href="#save" class="c-button">Button</a>
<a href="#save" class="c-button-primary">Button</a>
```

### CSSプリプロセッサのExtend

placeholder selectorによる@extendは、原則そのモジュールで完結する継承以外では利用を禁止します。

カテゴリーやレイヤー超えてextendによる継承をおこなった場合、YASSの構成・設計は破綻し、カスケーディングルールも複雑にしてしまう可能性があるためです。

以下は例外として、許容されるパターンをあげます。

#### ThemeによるExtend

```html
<a href="#" class="c-btn">ボタン</a>
<h2 class="c-heding2">見出し</h2>
```

```scss
%t-gradient-gray {
  background-image: linear-gradient(top, #F2F2F2, #C9C9C9);
}
.c-btn {
  @extend %t-gradient-gray
}
.c-heding2 {
  @extend %t-gradient-gray
}
```

## Layout、Module、Themeのカスケーディング

原則として、モジュール間のカスケーディング、他のモジュールを親とするセレクタを用いたカスケーディングは**禁止**とします。

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

例外として、Themeカテゴリーにおけるカスケーディング、例えば、次のようなテーマがレイアウトやComponentのモジュールを変更することは許容します。

```css
// Layout
#l-header {
  width: 100%;
}

.t-layout-fixed #l-header {
  width: 1200px;
}
```


