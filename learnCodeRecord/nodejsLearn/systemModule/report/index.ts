const process = require("process");
process.report?.writeReport();

// 未捕获错误出发时报告
// --report-uncaught-exception

// 信号触发时报告
// --report-onsignal

// 致命错误导致应用程序终止触发时报告 
// 在启动服务时上 --report-on-fatalerror 标志，当程序发生一些致命错误，例如内存泄漏、Node.js 运行时的内部错误等也会触发生成诊断报告。
// --report-on-fatalerror 

