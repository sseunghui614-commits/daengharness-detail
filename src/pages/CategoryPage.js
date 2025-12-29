import { useState,useEffect,useRef} from "react"
import ProductCard from "../components/category/ProductCard";
import Products from "../assets/data/products.json"
import { useParams } from "react-router-dom"
import { gsap } from "gsap/gsap-core";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './CategoryPage.scss';

gsap.registerPlugin(ScrollTrigger);

const CategoryPage = () => {
    const [CardList,setCardList] = useState([]);
    const [bestList,setBestList] = useState([]);
    const params = useParams();
    const [CategoryImg,setCategoryImg] = useState();
    const [CategoryColor,setCategoryColor] = useState();
    const [CategoryLine,setCategoryLine] = useState();
    const [Categorytitle,setCategorytitle] = useState();
    const containerRef = useRef(null);
    const prodRef = useRef(null);

//best가 true인 애들만 보이게
    useEffect(()=>{
        const items = Products.Product.filter(
        item => item.best === true && item.type === params.category
        );

        const cditem = Products.Product.filter(
        item => item.type === params.category
        );
        let ci;
        let cc;
        let cl;
        let ct;
        switch(params.category){
            case "H": ci="categoryImgH"; cc="best-hcolor"; cl="hbottomLine"; 
                    ct="기본형"; break;
            case "L": ci="categoryImgL"; cc="best-Lcolor"; cl="LbottomLine";ct="대형견추천";break;
            case "C": ci="categoryImgC"; cc="best-Ccolor"; cl="CbottomLine"; ct="의류형";break;
            case "Y": ci="categoryImgY"; cc="best-Ycolor"; cl="YbottomLine"; ct="목편한유형";break;
        }
        setCategoryImg(ci);
        setCategoryColor(cc);
        setCategoryLine(cl);
        setCategorytitle(ct);
        setBestList(items);
        setCardList(cditem);
    }, [params.category]);
//gsap 메뉴 올라오는거
        useGSAP(() => {
        if (!prodRef.current) return;

        const items = prodRef.current.querySelectorAll(".prod-item");
        if (!items.length) return;

        gsap.from(items, {
            y: 80,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            stagger: {
            grid: "auto",
            from: "start",
            amount: 1,
            },
            scrollTrigger: {
            trigger: prodRef.current,
            start: "top 85%",
            toggleActions: "play reverse play reverse"
            },
        });

        ScrollTrigger.refresh();
        }, {
        dependencies: [CardList],
        });
    return (
        <div id="category-page">
            <div className="category-wrap">
                <div className="category-top">
                    <div className={CategoryImg}>
                        
                    </div>
                </div>
                <div className= {`category-best ${CategoryLine}`}>
                <p>댕댕하네's <span className={CategoryColor}>{Categorytitle}</span> 베스트 상품</p>
                <div className="cetegory-bestlist">
                    {
                    bestList.map((item) => (
                    <div className="best-slide-item" key={item.id}>
                    <ProductCard item={item} />
                    </div>
                    )
                    )}
                </div>
                </div>
                <div ref={containerRef}>
                <div className="category-prod" ref={prodRef}>
                    {CardList.map(item => (
                        <div className="prod-item" key={item.id}>
                        <ProductCard item={item} />
                        </div>
                    ))}
                </div>
                </div>
        <div className="info-text">
            <p>강아지 별로 개인차가 있을수 있습니다</p>
        </div>
        </div>
        </div>

    )
}

export default CategoryPage