"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
        input.addEventListener("input", (e) => {
            if (e && e.target && "value" in e.target && "dataset" in e.target) {
                const { id } = e.target.dataset;
                m.infos[id] = e.target.value;
                m.typography();
                m.download();
            }
        });
        i++;
    });
};
const get = async function (urls) {
    let res = {
        data: [
            "银保业务或迎新规：设手续费上限、要求报行合一、鼓励佣金递延支付；国家医保局：通过医保谈判累计将26种罕见病药纳入医保，平均降价过半；",
            "网传南方电网员工妻子举报丈夫后遭威胁，媒体：是谁干的警方不妨给出答案。南方电网回应：丈夫打给妻弟的私人电话，不代表单位立场；",
            "数据显示：截至2021年，全国15岁以上单身人口约为2.39亿人，专家：年轻人普遍缺乏谈情说爱的能力；",
            "23日晚，辽宁大连普兰店发生4.6级地震，沈阳、盘锦等多地有震感，部分道路人行横道方砖开裂，暂无房屋倒塌及人员伤亡报告，客运列车出现晚点。大连：近期发生破坏性地震的可能性不大；",
            "23日早，浙江余姚市泗门镇一公司发生钢结构建筑倒塌事件，已造成2死3危重7轻伤；",
            "北京：物业不得收取生活垃圾处理费、装修管理服务费和保证金；",
            "安徽殡仪馆闹乌龙：遗体没火化骨灰就出炉，工作人员夜赴墓地取回骨灰。官方：已明确其归属并下葬，正调查责任人；",
            "台媒：蔡英文21日称，明年台防务预算将达6068亿新台币，创历史新高，占台湾GDP2.5%，台防务预算八年暴增近7成，岛内网民批民进党是老美摇钱树；台媒：岛内登革热病例累计达2135例，死亡2例，蔓延14县市；",
            "美方借涉藏问题对中国官员实施非法制裁，外交部：坚决反对、强烈谴责；",
            "外媒：特朗普计划于24日晚间黄金时段自首。美媒：特朗普或因难以遵守法院假释条件导致收监；伊朗推出类美国MQ-9死神武装无人机，称其24小时可飞抵以色列；周二，伊朗国防部推出了一款新型无人机“幻影”-10（mohajer-10），其外形酷似美国生产的mq-9“死神”无人机。",
            "23日晚，印度第三次探月任务月船3号成功着陆月球南极，成登月第四国，也成首个着陆月球南极的国家；印媒：23日早，印度米佐拉姆邦一在建铁路桥倒塌，桥体砸落山谷已致工人26死，救援正在进行；",
            "23日，韩国时隔6年举行空袭民防演习：民众抱头被疏散至地下，全国交通管制；越媒：越南副总理黎文成于当地22日晚因病去世，终年61岁；当地时间8月23日下午2时，韩国举行了6年来首次的全国民防演习。韩联社称，此次演习旨在应对“朝鲜导弹威胁”，民众可借此熟练掌握空袭状况发生时迅速疏散的方法。但路透社观察到，在警报响起时，很多行人对此并不在意，还有人直言“不相信战争发生”。",
            "日本东电公布首批核污水排放计划：若无恶劣气象条件，最快24日下午1点开始，17天内排放7800吨，今年预计排放约3.12万吨。俄科学家：这将是人类史上最大规模蓄意污染海洋试验。外交部：不希望2023年8月24日成为海洋环境的灾难日；东电将经过海水稀释的1200立方米核污染水存放在大型水槽中，并检测放射性物质氚的浓度。测定工作自22日开始，如果24日上午10点前，其浓度不到1500贝克勒尔/升，东电将照计划将核污水通过海底隧道排放。但如果气象条件不佳，海浪过高情况下，船上的海上监测点无法进行浓度测定，排海计划将取消。",
            "俄媒：俄空天军总司令苏罗维金被解职，传他可能牵涉此前的兵变，空天军总参谋长阿夫扎洛夫接替代理总司令；德媒：乌征兵部门查出大规模腐败，官员受贿后向被征召者出具残疾人证或将其列入不适合服役之列；俄罗斯国防部宣布，曾一度担任对乌军事行动作战指挥官的谢尔盖·苏罗维金因转业而被解除俄罗斯空天军司令职务，由国防部副部长、空天军总司令亚历山大·泽林上将接任。",
            "外媒：乌防长称已收到荷兰首架F-16战机，俄方称挫败三架袭击莫斯科的乌无人机；俄媒：莫斯科市区传出爆炸声，首都多个机场暂时关闭，无人员伤亡；",
        ],
    };
    for (const url of urls) {
        res = await (await fetch(url)).json();
        if (("zt" in res && res.zt === 0) ||
            ("success" in res && res.success === true))
            break;
    }
    return res;
};
class Info {
    static async init(templateUrl) {
        this.infoData = new InfoData(templateUrl);
        return new Promise((resolve) => {
            this.infoData.template.addEventListener("load", () => {
                this.infoData.canvas.width = this.infoData.template.width;
                this.infoData.canvas.height = this.infoData.template.height;
                resolve(this.infoData);
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
        link.innerText = "点击下载";
        document.querySelector("#container").appendChild(link);
    }
    async api2() {
        const res = await get([
            "http://bjb.yunwj.top/php/60miao/qq.php",
            "https://api.vvhan.com/api/60s?type=json",
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
    }
    async getNews() {
        // API 1：天行数据
        // const data = await fetch(
        //   "https://apis.tianapi.com/keji/index?key=122c151f57d1db1b42d75aa1baaab023&num=9"
        // );
        // this.infos = (await data.json()).result.newslist.map(
        //   (item: any) => item.title
        // );
        // API 2：每日 60 秒读懂世界
        const infos = await this.api2();
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
(async function () {
    const info = await Info.init("./image/info.jpg");
    if (info instanceof InfoData) {
        // const create = document.querySelector("#create");
        const download = document.querySelector("#download");
        // create?.addEventListener("click", async function () {
        //   await info.getNews();
        //   info.typography();
        // });
        download === null || download === void 0 ? void 0 : download.addEventListener("click", info.download);
        await info.getNews();
        info.typography();
        info.download();
        createEditor(info);
    }
})();
