import "./LifestyleVideoSection.scss";
import videoData from "../../assets/images/video/BannerVideo.webm";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


//플러그인 등록
gsap.registerPlugin(useGSAP, ScrollTrigger);

const LifestyleVideoSection = () => {
    const containerRef = useRef(null);
    const videoRef = useRef(null);
    useGSAP(() => {
        //1. 타임라인을 먼저 생성
        const tl = gsap.timeline();
        //2. 애니메이션 동작이 순서대로
        tl.to(videoRef.current, {
            height: '100vh'
        })
            .to(videoRef.current, {
                width: '80%',
                height: '80vh',
                borderRadius: '4rem'
            })
            .to('h2', {
                opacity: 0
            }, "<")
            .to('.video-txt', {
                opacity: 0.7
            });

        //scrolltrigger 등록
        ScrollTrigger.create({
            //tl을 연결 꼭!!! 타임라인 연결 필요
            animation: tl,
            trigger: containerRef.current,
            start: "center center",
            end: '+=3000',
            scrub: 1,
            pin: true,
            markers: false
        });
    }, { scope: containerRef });
    return (
        <section id="hoz-video" ref={containerRef}>
            <div className="video-wrap">
                <video loop autoPlay muted ref={videoRef}>
                    <source src={videoData} type="video/mp4" />
                </video>
            </div>
        </section>
    )
}

export default LifestyleVideoSection