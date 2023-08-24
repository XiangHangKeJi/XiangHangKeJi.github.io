"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function Autobind(_, _2, descriptor) {
    const func = descriptor.value;
    return {
        configurable: true,
        enumerable: false,
        get() {
            return func.bind(this);
        },
    };
}
function Throttle(func, wait) {
    let timeout;
    return function () {
        if (!timeout) {
            const context = this;
            const args = arguments;
            timeout = setTimeout(() => {
                func.call(context, ...args);
                timeout = null;
            }, wait);
        }
    };
}
const createEditor = function (m) {
    const editor = document.querySelector("#editor form ol");
    let i = 0;
    m.infos.forEach((item) => {
        const input = document.createElement("textarea");
        const li = document.createElement("li");
        input.id = `input${i}`;
        input.value = item;
        input.dataset.id = i + "";
        li.appendChild(input);
        editor === null || editor === void 0 ? void 0 : editor.appendChild(li);
        const func = Throttle(function (e) {
            if (e && e.target && "value" in e.target && "dataset" in e.target) {
                const { id } = e.target.dataset;
                m.infos[id] = e.target.value;
                m.typography();
                m.download();
            }
        }, 100);
        input.addEventListener("input", func);
        i++;
    });
};
const get = function (urls) {
    return __awaiter(this, void 0, void 0, function* () {
        let res;
        for (const url of urls) {
            try {
                res = yield (yield fetch(url)).json();
                if (("zt" in res && res.zt === 0) ||
                    ("success" in res && res.success === true))
                    break;
            }
            catch (err) {
                console.error(err);
            }
        }
        return res;
    });
};
class Info {
    static init(templateUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            this.infoData = new InfoData(templateUrl);
            return new Promise((resolve) => {
                this.infoData.template.addEventListener("load", () => {
                    this.infoData.canvas.width = this.infoData.template.width;
                    this.infoData.canvas.height = this.infoData.template.height;
                    resolve(this.infoData);
                });
            });
        });
    }
}
class InfoData {
    constructor(templateUrl) {
        this.template = new Image();
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.templateLoaded = false;
        this.infos = [];
        this.currentY = 680;
        this.lineWidth = 110;
        this.fontSize = 46;
        this.template.src = templateUrl;
    }
    add(content) {
        this.infos.push(content);
        this.typography();
    }
    remove(index) {
        this.infos.splice(index - 1, 1);
    }
    fillDate() {
        const d = new Date();
        const month = d.getMonth() + 1;
        const date = `${d.getFullYear()}.${month < 10 ? "0" + month : month}.${d.getDate()}`;
        const ctx = this.ctx;
        if (ctx) {
            ctx.font = "1000 56px Arial"; // 设置字体样式和大小
            ctx.fillStyle = "rgb(139,159,186)"; // 设置文字颜色
            ctx === null || ctx === void 0 ? void 0 : ctx.fillText(date, this.canvas.width - 39 * date.length, 110);
        }
    }
    typography() {
        const ctx = this.ctx;
        const image = this.template;
        const canvas = this.canvas;
        if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // 将图片绘制到 canvas 上
            ctx.drawImage(image, 0, 0);
            this.currentY = 680;
            this.fillDate();
            // 在 canvas 上绘制文字
            ctx.font = `${this.fontSize}px 微软雅黑`; // 设置字体样式和大小
            ctx.fillStyle = "black"; // 设置文字颜色
            const margin = 110;
            for (let i = 0; i < this.infos.length; i++)
                this.wrapText(`${i + 1}. ${this.infos[i]}`, this.lineWidth, this.currentY + margin);
            // 将绘制后的图片添加到页面上
            document.querySelector("#container").innerHTML = "";
            document.querySelector("#container").appendChild(canvas);
        }
    }
    download() {
        // 创建一个 < a > 元素并设置其属性;
        const link = document.createElement("a");
        link.href = this.canvas.toDataURL();
        link.download = "info.png"; // 设置下载的文件名
        link.innerText = "下载图片";
        document.querySelector("#container").appendChild(link);
    }
    api2() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield get([
                "https://api.vvhan.com/api/60s?type=json",
                "http://bjb.yunwj.top/php/60miao/qq.php",
                "https://60s.viki.moe/",
            ]);
            let data;
            console.log(res);
            if ("data" in res)
                data = res.data;
            if ("wb" in res && res.wb instanceof Array)
                data = res.wb.flat().map((item) => item.slice(2));
            let ret;
            if (data) {
                ret = data
                    .map((item) => item.slice(0, -1) + "。")
                    .map((item) => (item.includes("【微语】") ? "" : item));
            }
            return ret;
        });
    }
    getNews() {
        return __awaiter(this, void 0, void 0, function* () {
            // API 1：天行数据
            // const data = await fetch(
            //   "https://apis.tianapi.com/keji/index?key=122c151f57d1db1b42d75aa1baaab023&num=9"
            // );
            // this.infos = (await data.json()).result.newslist.map(
            //   (item: any) => item.title
            // );
            // API 2：每日 60 秒读懂世界
            const infos = yield this.api2();
            const rows = [3, 2, 2, 2, 3, 3];
            let i = 0;
            const ctx = this.ctx;
            if (ctx && infos) {
                for (const row of rows) {
                    for (const item of infos) {
                        const left = (row - 1) * this.lineWidth + this.fontSize;
                        const right = row * this.lineWidth * 2;
                        const length = ctx.measureText(item).width;
                        console.log(left, right, length);
                        if (length >= left && length <= right) {
                            this.infos.push(item);
                            infos.splice(infos.indexOf(item), 1);
                            break;
                        }
                    }
                }
            }
        });
    }
    wrapText(text, x, y, maxWidth = 1030, lineHeight = 60) {
        let context = this.ctx;
        let canvas = this.canvas;
        // 字符分隔为数组
        let arrText = text.split("");
        let line = "";
        if (context) {
            for (let n = 0; n < arrText.length; n++) {
                let testLine = line + arrText[n];
                let metrics = context.measureText(testLine);
                let testWidth = metrics.width;
                if (testWidth > maxWidth && n > 0) {
                    context.fillText(line, x, y);
                    line = arrText[n];
                    y += lineHeight;
                }
                else {
                    line = testLine;
                }
            }
            context.fillText(line, x, y);
            this.currentY = y;
        }
    }
}
__decorate([
    Autobind
], InfoData.prototype, "typography", null);
__decorate([
    Autobind
], InfoData.prototype, "download", null);
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        const info = yield Info.init("./image/info.jpg");
        if (info instanceof InfoData) {
            // const create = document.querySelector("#create");
            const download = document.querySelector("#download");
            // create?.addEventListener("click", async function () {
            //   await info.getNews();
            //   info.typography();
            // });
            download === null || download === void 0 ? void 0 : download.addEventListener("click", info.download);
            yield info.getNews();
            info.typography();
            info.download();
            createEditor(info);
        }
    });
})();
