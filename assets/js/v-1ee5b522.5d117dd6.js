"use strict";(self.webpackChunkjvm=self.webpackChunkjvm||[]).push([[220],{4253:(e,l,a)=>{a.r(l),a.d(l,{data:()=>i});const i={key:"v-1ee5b522",path:"/04-hotspot-gc.html",title:"HotSpot 垃圾收集器",lang:"zh-CN",frontmatter:{},excerpt:"",headers:[{level:2,title:"新生代垃圾收集器",slug:"新生代垃圾收集器",children:[{level:3,title:"Serial 垃圾收集器（单线程）",slug:"serial-垃圾收集器-单线程",children:[]},{level:3,title:"ParNew 垃圾收集器（多线程）",slug:"parnew-垃圾收集器-多线程",children:[]},{level:3,title:"Parallel Scavenge 垃圾收集器（多线程）",slug:"parallel-scavenge-垃圾收集器-多线程",children:[]}]},{level:2,title:"老年代垃圾收集器",slug:"老年代垃圾收集器",children:[{level:3,title:"Serial Old 垃圾收集器（单线程）",slug:"serial-old-垃圾收集器-单线程",children:[]},{level:3,title:"Parallel Old 垃圾收集器（多线程）",slug:"parallel-old-垃圾收集器-多线程",children:[]},{level:3,title:"CMS 垃圾收集器",slug:"cms-垃圾收集器",children:[]}]},{level:2,title:"G1 通用垃圾收集器",slug:"g1-通用垃圾收集器",children:[]}],filePathRelative:"04-hotspot-gc.md",git:{updatedTime:1634803668e3,contributors:[{name:"yanglbme",email:"szuyanglb@outlook.com",commits:10},{name:"linnan",email:"51509297+linnanc@users.noreply.github.com",commits:1},{name:"yanglbme",email:"yanglbme@users.noreply.github.com",commits:1},{name:"杨立滨",email:"szuyanglb@outlook.com",commits:1}]}}},3668:(e,l,a)=>{a.r(l),a.d(l,{default:()=>t});const i=(0,a(6252).uE)('<h1 id="hotspot-垃圾收集器" tabindex="-1"><a class="header-anchor" href="#hotspot-垃圾收集器" aria-hidden="true">#</a> HotSpot 垃圾收集器</h1><p>HotSpot 虚拟机提供了多种垃圾收集器，每种收集器都有各自的特点，虽然我们要对各个收集器进行比较，但并非为了挑选出一个最好的收集器。我们选择的只是对具体应用最合适的收集器。</p><h2 id="新生代垃圾收集器" tabindex="-1"><a class="header-anchor" href="#新生代垃圾收集器" aria-hidden="true">#</a> 新生代垃圾收集器</h2><h3 id="serial-垃圾收集器-单线程" tabindex="-1"><a class="header-anchor" href="#serial-垃圾收集器-单线程" aria-hidden="true">#</a> Serial 垃圾收集器（单线程）</h3><p>只开启<strong>一条</strong> GC 线程进行垃圾回收，并且在垃圾收集过程中停止一切用户线程，即 Stop The World。</p><p>一般客户端应用所需内存较小，不会创建太多对象，而且堆内存不大，因此垃圾收集器回收时间短，即使在这段时间停止一切用户线程，也不会感觉明显卡顿。因此 Serial 垃圾收集器<strong>适合客户端</strong>使用。</p><p>由于 Serial 收集器只使用一条 GC 线程，避免了线程切换的开销，从而简单高效。</p><p><img src="https://cdn.jsdelivr.net/gh/doocs/jvm@main/images/serial.png" alt="Serial"></p><h3 id="parnew-垃圾收集器-多线程" tabindex="-1"><a class="header-anchor" href="#parnew-垃圾收集器-多线程" aria-hidden="true">#</a> ParNew 垃圾收集器（多线程）</h3><p>ParNew 是 Serial 的多线程版本。由多条 GC 线程并行地进行垃圾清理。但清理过程依然需要 Stop The World。</p><p>ParNew 追求“<strong>低停顿时间</strong>”,与 Serial 唯一区别就是使用了多线程进行垃圾收集，在多 CPU 环境下性能比 Serial 会有一定程度的提升；但<strong>线程切换需要额外的开销</strong>，因此在单 CPU 环境中表现不如 Serial。</p><p><img src="https://cdn.jsdelivr.net/gh/doocs/jvm@main/images/parnew.png" alt="ParNew"></p><h3 id="parallel-scavenge-垃圾收集器-多线程" tabindex="-1"><a class="header-anchor" href="#parallel-scavenge-垃圾收集器-多线程" aria-hidden="true">#</a> Parallel Scavenge 垃圾收集器（多线程）</h3><p>Parallel Scavenge 和 ParNew 一样，都是多线程、新生代垃圾收集器。但是两者有巨大的不同点：</p><ul><li>Parallel Scavenge：追求 CPU 吞吐量，能够在较短时间内完成指定任务，因此适合没有交互的后台计算。</li><li>ParNew：追求降低用户停顿时间，适合交互式应用。</li></ul><p><code>吞吐量 = 运行用户代码时间 / (运行用户代码时间 + 垃圾收集时间)</code></p><p>追求高吞吐量，可以通过减少 GC 执行实际工作的时间，然而，仅仅偶尔运行 GC 意味着每当 GC 运行时将有许多工作要做，因为在此期间积累在堆中的对象数量很高。单个 GC 需要花更多的时间来完成，从而导致更高的暂停时间。而考虑到低暂停时间，最好频繁运行 GC 以便更快速完成，反过来又导致吞吐量下降。</p><ul><li>通过参数 -XX:GCTimeRadio 设置垃圾回收时间占总 CPU 时间的百分比。</li><li>通过参数 -XX:MaxGCPauseMillis 设置垃圾处理过程最久停顿时间。</li><li>通过命令 -XX:+UseAdaptiveSizePolicy 开启自适应策略。我们只要设置好堆的大小和 MaxGCPauseMillis 或 GCTimeRadio，收集器会自动调整新生代的大小、Eden 和 Survivor 的比例、对象进入老年代的年龄，以最大程度上接近我们设置的 MaxGCPauseMillis 或 GCTimeRadio。</li></ul><h2 id="老年代垃圾收集器" tabindex="-1"><a class="header-anchor" href="#老年代垃圾收集器" aria-hidden="true">#</a> 老年代垃圾收集器</h2><h3 id="serial-old-垃圾收集器-单线程" tabindex="-1"><a class="header-anchor" href="#serial-old-垃圾收集器-单线程" aria-hidden="true">#</a> Serial Old 垃圾收集器（单线程）</h3><p>Serial Old 收集器是 Serial 的老年代版本，都是单线程收集器，只启用一条 GC 线程，都适合客户端应用。它们唯一的区别就是：Serial Old 工作在老年代，使用“标记-整理”算法；Serial 工作在新生代，使用“复制”算法。</p><h3 id="parallel-old-垃圾收集器-多线程" tabindex="-1"><a class="header-anchor" href="#parallel-old-垃圾收集器-多线程" aria-hidden="true">#</a> Parallel Old 垃圾收集器（多线程）</h3><p>Parallel Old 收集器是 Parallel Scavenge 的老年代版本，追求 CPU 吞吐量。</p><h3 id="cms-垃圾收集器" tabindex="-1"><a class="header-anchor" href="#cms-垃圾收集器" aria-hidden="true">#</a> CMS 垃圾收集器</h3><p>CMS（Concurrent Mark Sweep，并发标记清除）收集器是以获取最短回收停顿时间为目标的收集器（追求低停顿），它在垃圾收集时使得用户线程和 GC 线程并发执行，因此在垃圾收集过程中用户也不会感到明显的卡顿。</p><ul><li>初始标记：Stop The World，仅使用一条初始标记线程对所有与 GC Roots 直接关联的对象进行标记。</li><li>并发标记：使用<strong>多条</strong>标记线程，与用户线程并发执行。此过程进行可达性分析，标记出所有废弃对象。速度很慢。</li><li>重新标记：Stop The World，使用多条标记线程并发执行，将刚才并发标记过程中新出现的废弃对象标记出来。</li><li>并发清除：只使用一条 GC 线程，与用户线程并发执行，清除刚才标记的对象。这个过程非常耗时。</li></ul><p>并发标记与并发清除过程耗时最长，且可以与用户线程一起工作，因此，<strong>总体上说</strong>，CMS 收集器的内存回收过程是与用户线程<strong>一起并发执行</strong>的。</p><p><img src="https://cdn.jsdelivr.net/gh/doocs/jvm@main/images/cms.png" alt="CMS"></p><p>CMS 的缺点：</p><ul><li>吞吐量低</li><li>无法处理浮动垃圾</li><li>使用“标记-清除”算法产生碎片空间，导致频繁 Full GC</li></ul><p>对于产生碎片空间的问题，可以通过开启 -XX:+UseCMSCompactAtFullCollection，在每次 Full GC 完成后都会进行一次内存压缩整理，将零散在各处的对象整理到一块。设置参数 -XX:CMSFullGCsBeforeCompaction 告诉 CMS，经过了 N 次 Full GC 之后再进行一次内存整理。</p><h2 id="g1-通用垃圾收集器" tabindex="-1"><a class="header-anchor" href="#g1-通用垃圾收集器" aria-hidden="true">#</a> G1 通用垃圾收集器</h2><p>G1 是一款面向服务端应用的垃圾收集器，它没有新生代和老年代的概念，而是将堆划分为一块块独立的 Region。当要进行垃圾收集时，首先估计每个 Region 中垃圾的数量，每次都从垃圾回收价值最大的 Region 开始回收，因此可以获得最大的回收效率。</p><p>从整体上看， G1 是基于“标记-整理”算法实现的收集器，从局部（两个 Region 之间）上看是基于“复制”算法实现的，这意味着运行期间不会产生内存空间碎片。</p><p>这里抛个问题 👇</p><blockquote><p>一个对象和它内部所引用的对象可能不在同一个 Region 中，那么当垃圾回收时，是否需要扫描整个堆内存才能完整地进行一次可达性分析？</p></blockquote><p>并不！每个 Region 都有一个 Remembered Set，用于记录本区域中所有对象引用的对象所在的区域，进行可达性分析时，只要在 GC Roots 中再加上 Remembered Set 即可防止对整个堆内存进行遍历。</p><p>如果不计算维护 Remembered Set 的操作，G1 收集器的工作过程分为以下几个步骤：</p><ul><li>初始标记：Stop The World，仅使用一条初始标记线程对所有与 GC Roots 直接关联的对象进行标记。</li><li>并发标记：使用<strong>一条</strong>标记线程与用户线程并发执行。此过程进行可达性分析，速度很慢。</li><li>最终标记：Stop The World，使用多条标记线程并发执行。</li><li>筛选回收：回收废弃对象，此时也要 Stop The World，并使用多条筛选回收线程并发执行。</li></ul>',39),r={},t=(0,a(3744).Z)(r,[["render",function(e,l){return i}]])},3744:(e,l)=>{l.Z=(e,l)=>{const a=e.__vccOpts||e;for(const[e,i]of l)a[e]=i;return a}}}]);