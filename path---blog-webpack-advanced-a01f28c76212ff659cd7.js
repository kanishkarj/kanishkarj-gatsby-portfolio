webpackJsonp([0xc03828663468],{434:function(n,s){n.exports={data:{site:{meta:{title:"Kanishkar J",siteDescr:"Kanishkar J",siteUrl:"https://kanishkarj.github.com/",siteAuthor:"Kanishkar J",siteTwitterUrl:"https://twitter.com/_kanishkarj_",siteGithubUrl:"https://github.com/kanishkarj",siteEmailUrl:"kanishkarj@hotmail.com",siteGitconnectedUrl:"https://gitconnected.com/kanishkarj"}},markdownRemark:{id:"/home/sentinel/work/kanishkarj.github.io/src/pages/markdown/blog/webpack-part4/post.md absPath of file >>> MarkdownRemark",html:'<p>In this post we’ll make some changes to our configuration so that the finally built files are ready for production. If you notice, <code class="language-text">/dist/assets/js/app.bundle.js</code> is a huge file. Now as we start using more libraries the file gets bigger and bigger. That impacts the performance of the application as the browser will have to load bigger files. One way to reduce the file size is to minimize the js files.</p>\n<h2>Minimizing JS files</h2>\n<p>To minimze files we use <code class="language-text">uglifyjs-webpack-plugin</code>. To configure it, we first import <em>webpack.common.js</em> in <em>webpack.prod.js</em> : </p>\n<p><strong>webpack.prod.js</strong> </p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">const</span> merge <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'webpack-merge\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">const</span> common <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'./webpack.common.js\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">const</span> webpack <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'webpack\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\nmodule<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token function">merge</span><span class="token punctuation">(</span>common<span class="token punctuation">,</span> <span class="token punctuation">{</span>\n  \n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>Now run the follwing on command line to install <em>uglifyjs-webpack-plugin</em> :</p>\n<div class="gatsby-highlight">\n      <pre class="language-shell"><code class="language-shell">npm i -D uglifyjs-webpack-plugin</code></pre>\n      </div>\n<p>Lets import it inside our file : </p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token comment">// ...</span>\n<span class="token keyword">const</span> UglifyJSPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'uglifyjs-webpack-plugin\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>The config for minimzing the files :</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token function">merge</span><span class="token punctuation">(</span>common<span class="token punctuation">,</span> <span class="token punctuation">{</span>\n  devtool<span class="token punctuation">:</span> <span class="token string">\'source-map\'</span><span class="token punctuation">,</span>\n  plugins<span class="token punctuation">:</span> <span class="token punctuation">[</span>\n    <span class="token keyword">new</span> <span class="token class-name">UglifyJSPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n      sourceMap<span class="token punctuation">:</span> <span class="token boolean">true</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span>\n  <span class="token punctuation">]</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p><code class="language-text">devtool: &#39;source-map&#39;</code> : A full SourceMap is emitted as a separate file. It adds a reference comment to the bundle so development tools know where to find it.</p>\n<p>Run <code class="language-text">npm run build:prod</code> in the command line. Now if you open <em>/dist/assets/js/app.bundle.js</em> you’ll notice the code has been minified, i.e the whole code is in one line.</p>\n<p>We’ll also specify to webpack that it is running under production mode, so that webpack can manage the libraries. That is webpack can remove the testing libraries while bundling. So lets add another plugin to the plugins array :</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">new</span> <span class="token class-name">webpack<span class="token punctuation">.</span>DefinePlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  <span class="token string">\'process.env.NODE_ENV\'</span><span class="token punctuation">:</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span><span class="token string">\'production\'</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span></code></pre>\n      </div>\n<p>So at the end of this we have :</p>\n<p><strong>webpack.prod.js</strong></p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">const</span> merge <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'webpack-merge\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">const</span> UglifyJSPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'uglifyjs-webpack-plugin\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">const</span> common <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'./webpack.common.js\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">const</span> webpack <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'webpack\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\nmodule<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token function">merge</span><span class="token punctuation">(</span>common<span class="token punctuation">,</span> <span class="token punctuation">{</span>\n    devtool<span class="token punctuation">:</span> <span class="token string">\'source-map\'</span><span class="token punctuation">,</span>\n    plugins<span class="token punctuation">:</span> <span class="token punctuation">[</span>\n        <span class="token keyword">new</span> <span class="token class-name">UglifyJSPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n            sourceMap<span class="token punctuation">:</span> <span class="token boolean">true</span>\n        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n        <span class="token keyword">new</span> <span class="token class-name">webpack<span class="token punctuation">.</span>DefinePlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n            <span class="token string">\'process.env.NODE_ENV\'</span><span class="token punctuation">:</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span><span class="token string">\'production\'</span><span class="token punctuation">)</span>\n        <span class="token punctuation">}</span><span class="token punctuation">)</span>\n    <span class="token punctuation">]</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<h2>Webpack Chunks</h2>\n<p>Chunks enables one to split code into different bundles. This can be used to improve performance of the application. For understanding this more clearly lets create another JS, SCSS, HTML file. </p>\n<p><strong>/src/assets/scss/page.scss</strong></p>\n<div class="gatsby-highlight">\n      <pre class="language-scss"><code class="language-scss">$bgcolor: gray;\nbody {\n    background: $bgcolor;\n}</code></pre>\n      </div>\n<p><strong>/src/assets/js/page.js</strong></p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">import</span> <span class="token string">\'../scss/page.scss\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">let</span> temp <span class="token operator">=</span> <span class="token string">"page.js"</span><span class="token punctuation">;</span>\n<span class="token keyword">const</span> <span class="token function-variable function">func</span> <span class="token operator">=</span> <span class="token punctuation">(</span>val<span class="token punctuation">)</span> <span class="token operator">=></span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token function">func</span><span class="token punctuation">(</span>temp<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p><strong>/src/page.html</strong></p>\n<div class="gatsby-highlight">\n      <pre class="language-html"><code class="language-html">&lt;!DOCTYPE html&gt;\n&lt;html&gt;\n\n&lt;head&gt;\n    &lt;meta charset=&quot;utf-8&quot; /&gt;\n    &lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;IE=edge&quot;&gt;\n    &lt;title&gt;Page Title&lt;/title&gt;\n    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1&quot;&gt;\n&lt;/head&gt;\n\n&lt;body&gt;\n    &lt;h1&gt;Page Chunk&lt;/h1&gt;\n&lt;/body&gt;\n\n&lt;/html&gt;</code></pre>\n      </div>\n<p>We’ll make some modifications to <em>webpack.common.js</em> :</p>\n<h3>Add another entry point</h3>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">const</span> config <span class="token operator">=</span> <span class="token punctuation">{</span>\n  entry<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    app<span class="token punctuation">:</span> <span class="token string">\'./assets/js/app.js\'</span><span class="token punctuation">,</span>\n    page<span class="token punctuation">:</span> <span class="token string">\'./assets/js/page.js\'</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token comment">// ...</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Here <code class="language-text">app</code> and <code class="language-text">page</code> are chunk names. Chunks are basically names used to identify bundles. Lets test it, run <code class="language-text">npm run build</code>. You should see 2 different files created <em>app.bundle.js</em> and <em>page.bundle.js</em> . But if you remember we didn’t specify any output path for the other file. That wasnt a problem as the specifed output path was <code class="language-text">[name].bundle.js</code>, hence a file is created for each chunk and named as specified.</p>\n<h3>Specify the Chunks in HTML Plugin</h3>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">const</span> config <span class="token operator">=</span> <span class="token punctuation">{</span>\n    <span class="token comment">// ...</span>\n    plugins<span class="token punctuation">:</span> <span class="token punctuation">[</span>\n        <span class="token comment">// ...</span>\n        <span class="token keyword">new</span> <span class="token class-name">HtmlWebpackPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n            filename<span class="token punctuation">:</span> <span class="token string">\'index.html\'</span><span class="token punctuation">,</span>\n            template<span class="token punctuation">:</span> <span class="token string">\'index.html\'</span><span class="token punctuation">,</span>\n            chunks<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">\'app\'</span><span class="token punctuation">]</span>\n        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n        <span class="token keyword">new</span> <span class="token class-name">HtmlWebpackPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n            filename<span class="token punctuation">:</span> <span class="token string">\'page.html\'</span><span class="token punctuation">,</span>\n            template<span class="token punctuation">:</span> <span class="token string">\'page.html\'</span><span class="token punctuation">,</span>\n            chunks<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">\'page\'</span><span class="token punctuation">]</span>\n        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token punctuation">]</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>We have created a new instance of HTMLWebpackPlugin with the configuration for <em>page.html</em>. Now below it we have added a new line called <code class="language-text">chunks</code>, which is an array that defines all the chunks the particular html file will be using. On building the project you’ll notice that 2 files are created <em>index.html</em> and <em>page.html</em>. On opening you’ll find that the specified js file is referenced in it.</p>\n<hr>\n<p>Thats it I guess, we have covered the basics about webpack. This should help you build your own config as per your requirements. If you run into any issue feel free to contact me.</p>',frontmatter:{path:"/blog/webpack-advanced/",title:"Webpack Configuration Part 3 : Advanced topics",subtitle:"Production configuration in webpack, and chunks in webpacks.",headerImg:"https://raw.githubusercontent.com/webpack/media/master/logo/logo-on-white-bg.png",date:"30 Mar, 2018"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-webpack-advanced-a01f28c76212ff659cd7.js.map