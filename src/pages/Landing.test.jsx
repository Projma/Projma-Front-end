import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Landing from "./Landing";
import { MemoryRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const text3 = `پروجما به کمک امکانات گسترده خود، چون گزارش روزانه، دسته‌بندی کارها،
          تعیین ددلاین، ارتباطات درون تیمی مستمر و موثر به محیط کاری شما نظم
          بخشیده به تکمیل کارها و کنترل پروژه سرعت می‌بخشد. همچنین پروجما
          می‌تواند یک ابزار دورکاری بسیار مناسب برای مدیریت دورکاری تیم شما
          باشد.`;
const text1 =
    "همه چیز با یک تابلوی بصری شروع می شود - هسته سیستم عامل کار projma.ir. آن را به روش خود تنظیم کنید و هر چیزی را از پروژه ها گرفته تا بخش ها را مدیریت کنید.‎";
const text2 = `کار خود را ساده کنید
حداکثر بهره وری
تمام کارها، فرآیندها، ابزارها و فایل های خود را در یک سیستم عامل Work متمرکز کنید. تیم ها را به هم متصل کنید، سیلوها را پل کنید و یک منبع حقیقت را در سراسر سازمان خود حفظ کنید.‎
تیم ها را دور هم جمع کنید تا
تاثیر کسب و کار را هدایت کند
به طور مؤثر در سراسر سازمان همکاری کنید تا تصویر واضحی از همه کار خود داشته باشید. با اتوماسیون‌های آسان و اعلان‌های هم‌زمان در جریان باشید.‎`;
const text4 =
    "از ابزارهای مدیریت موجود استفاده ‌می‌کنید اما زمان زیادی صرف انجام کارها و پروژه‌ها می‌کنید و به موقع به سر رسید کارها نمی‌رسید؟ و یا ابزارهای قدیمی به حدی پیچیدگی دارند که شما و تیمتان را سردرگم می‌کند؟‎";
const detail1 = `مدیریت پروژه (به انگلیسی: Project management) تخصیص، پیگیری و کاربرد منابع برای رسیدن به اهداف مشخص در یک دوره زمانی خاص را مدیریت پروژه می‌گویند.[۱] به بیان دیگر مدیریت پروژه به‌کارگیری دانش، مهارت‌ها، ابزارها و تکنیک‌ها برای فعالیت‌های پروژه به منظور تحقق الزامات پروژه است. مدیریت پروژه با استفاده از فرآیندهایی هم‌چون فرآیندهای آغازین، برنامه‌ریزی، اجرایی، پایشی و اختتامی انجام می‌پذیرد.[۲] از طرف دیگر می‌توان مدیریت پروژه را شامل قوانینی دانست که برای شروع، برنامه‌ریزی، اجرا، کنترل و خاتمه کار یک تیم برای دستیابی به اهداف خاص و برآورده کردن معیارهای موفقیت مشخص لازم هستند.`;
const detail2 = `یک پروژه منحصر به فرد و غیرتکراری است و بنابراین یک کار معمولی و روتین نیست. بلکه مجموعهٔ از عملیات است که برای دستیابی به یک هدف واحد طراحی شده‌است؛ بنابراین یک تیم پروژه معمولاً شامل افرادی است که به‌طور معمول با هم کار نمی‌کنند، بعضی اوقات از سازمان‌ها و حتی چندین جغرافیای مختلف هستند.`;
const detail3 = `فرآیندی است در جهت حفظ مسیر پروژه، برای دستیابی به تعادلی اقتصادی و موجه، بین سه عامل هزینه، زمان و کیفیت، در حین اجرای پروژه، که از ابزار و تکنیک‌های خاص خود، در انجام این مهم کمک می‌گیرد. در واقع کنترل اجرای دقیق و کامل برنامه تدوین شده برای پروژه است، به‌طوری‌که هنگام خروج از برنامه بتوان با تشخیص علل و طرح اقتصادی‌ترین فعالیت‌ها، پروژه را به نزدیک‌ترین حالت ممکن در مسیر اولیه و اصلی خود بازگرداند. کنترل پروژه در این راه از سه عامل زیر بهره می‌گیرد.`;
const detail4 = `منظور آموزش برای انجام فعالیت‌های آماده‌سازی، نظارت و اجرای پروژه به ویژه پروژه‌های عمرانی طرح‌ریزی شده‌است. ویژگی اصلی تخصصی مهندسی مدیریت پروژه، ماهیت بین رشته‌ای آن است. این رشته تلفیقی از رشته‌های عمران، صنایع و مدیریت می‌باشد.

برای مدیریت پروژه روش‌های و طرح‌های بسیاری وجود دارد که بسته به نوع پروژه و شرایط ویژه آن اتخاذ می‌شود نحوه مدیریت پروژه تأثیر مستقیمی بر رسیدن به اهداف آن دارد.

هر چند که رویکرد مدیریت پروژه یک رویکرد کاملاً اقتضایی است اما با فرموله کردن موضوع می‌توان از درست بودن تصمیم‌های گرفته شده اطمینان حاصل کرد.`;

describe("Landing", () => {
    it("renders the header component", () => {
        const initialState = {
            user: {
                profile_pic: null
            }
        };
        const mockStore = configureStore();
        store = mockStore(initialState);
        let store;
        screen.width = 1000;
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Landing />
                </MemoryRouter>
            </Provider>
        );
        expect(screen.getByRole("banner")).toBeInTheDocument();
        // set the screen width to 500px to test the mobile view
        // screen.width = 400;
        // expect(screen.getByRole("banner")).toBeInTheDocument();
    });

    // it("renders a title in the document head",async () => {
    //     const initialState = {
    //         user: {
    //             profile_pic: null
    //         }
    //     };
    //     const mockStore = configureStore();
    //     store = mockStore(initialState);
    //     let store;
    //     render(
    //         <Provider store={store}>
    //             <MemoryRouter>
    //                 <Landing />
    //             </MemoryRouter>
    //         </Provider>
    //     );
    //     expect(document.title).toEqual("پروجما");
    //     // // get title by id
    //     // const title = document.querySelector("#title");
    //     // expect(title).toBeInTheDocument();
    //     // ------------------
    //     // const wrapper = mount(<Metadata/>);
    //     // // this will return all the markup assigned to helmet
    //     // // which will get rendered inside head.
    //     // const helmet = Helmet.peek();
    //     // expect(helmet.title).to.equal("title");
    // });

    // it("renders the first paragraph of text", async () => {
    //     const initialState = {
    //         user: {
    //             profile_pic: null
    //         }
    //     };
    //     const mockStore = configureStore();
    //     store = mockStore(initialState);
    //     let store;
    //     screen.width = 1000;
    //     const { getByText } = render(
    //         <Provider store={store}>
    //             <MemoryRouter>
    //                 <Landing />
    //             </MemoryRouter>
    //         </Provider>
    //     );
    //     // expect(getByText("از ابزارهای مدیریت موجود استفاده")).toBeInTheDocument();
    //     const paragraph = screen.getByText(
    //         /از ابزارهای مدیریت موجود استفاده/i
    //     );
    //     expect(paragraph).toBeInTheDocument();
    // });

    // it("renders the first top image", () => {
    //     const initialState = {
    //         user: {
    //             profile_pic: null
    //         }
    //     };
    //     const mockStore = configureStore();
    //     store = mockStore(initialState);
    //     let store;
    //     screen.width = 1000;
    //     const { getByText } = render(
    //         <Provider store={store}>
    //             <MemoryRouter>
    //                 <Landing />
    //             </MemoryRouter>
    //         </Provider>
    //     );
    //     const image = screen.getByRole("img", { name: /good team/i });
    //     expect(image).toBeInTheDocument();
    // });

    // it("renders the second paragraph of text",async () => {
    //     const initialState = {
    //         user: {
    //             profile_pic: null
    //         }
    //     };
    //     const mockStore = configureStore();
    //     store = mockStore(initialState);
    //     let store;
    //     screen.width = 1000;
    //     const { getByText } = render(
    //         <Provider store={store}>
    //             <MemoryRouter>
    //                 <Landing />
    //             </MemoryRouter>
    //         </Provider>
    //     );
    //     const paragraph = screen.getByText(
    //         /از ابزارهای مدیریت موجود استفاده/i,
    //         { selector: "div > div > div > div > div > div > div > div > p" }
    //     );
    //     expect(paragraph).toBeInTheDocument();
    // });

    // it("renders the second top image", () => {
    //     const initialState = {
    //         user: {
    //             profile_pic: null
    //         }
    //     };
    //     const mockStore = configureStore();
    //     store = mockStore(initialState);
    //     let store;
    //     screen.width = 1000;
    //     const { getByText } = render(
    //         <Provider store={store}>
    //             <MemoryRouter>
    //                 <Landing />
    //             </MemoryRouter>
    //         </Provider>
    //     );
    //     const image = screen.getByRole("img", { name: /software engineer/i });
    //     expect(image).toBeInTheDocument();
    // });

    // it("renders the first card",async () => {
    //     const initialState = {
    //         user: {
    //             profile_pic: null
    //         }
    //     };
    //     const mockStore = configureStore();
    //     store = mockStore(initialState);
    //     let store;
    //     screen.width = 1000;
    //     const { getByText } = render(
    //         <Provider store={store}>
    //             <MemoryRouter>
    //                 <Landing />
    //             </MemoryRouter>
    //         </Provider>
    //     );
    //     expect(getByText(text1)).toBeInTheDocument();
    //     expect(getByText(detail1)).toBeInTheDocument();
    // });

    // it("renders the second card", () => {
    //     const initialState = {
    //         user: {
    //             profile_pic: null
    //         }
    //     };
    //     const mockStore = configureStore();
    //     store = mockStore(initialState);
    //     let store;
    //     screen.width = 1000;
    //     const { getByText } = render(
    //         <Provider store={store}>
    //             <MemoryRouter>
    //                 <Landing />
    //             </MemoryRouter>
    //         </Provider>
    //     );
    //     expect(getByText(text2)).toBeInTheDocument();
    //     expect(getByText(detail2)).toBeInTheDocument();
    // });

    // it("renders the third card", () => {
    //     const initialState = {
    //         user: {
    //             profile_pic: null
    //         }
    //     };
    //     const mockStore = configureStore();
    //     store = mockStore(initialState);
    //     let store;
    //     screen.width = 1000;
    //     const { getByText } = render(
    //         <Provider store={store}>
    //             <MemoryRouter>
    //                 <Landing />
    //             </MemoryRouter>
    //         </Provider>
    //     );
    //     expect(getByText(text3)).toBeInTheDocument();
    //     expect(getByText(detail3)).toBeInTheDocument();
    // });

    // it("renders the footer component", () => {
    //     const initialState = {
    //         user: {
    //             profile_pic: null
    //         }
    //     };
    //     const mockStore = configureStore();
    //     store = mockStore(initialState);
    //     let store;
    //     screen.width = 1000;
    //     const { getByText } = render(
    //         <Provider store={store}>
    //             <MemoryRouter>
    //                 <Landing />
    //             </MemoryRouter>
    //         </Provider>
    //     );
    //     expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    // });
});
