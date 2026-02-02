import React, { useState, useEffect } from "react";
import PieChartComp from "../components/pieChartComp";
import ProfileCard from "../components/ProfileCard.jsx";
import CtoPhoto from "../assets/cto_photo.png";
import interiorImage1 from "../assets/interior-photos/living-room.png";
import interiorImage2 from "../assets/interior-photos/kitchen.jpg";
import interiorImage3 from "../assets/interior-photos/master-bedroom.png";
import interiorImage4 from "../assets/interior-photos/dining-room.png";
import interiorImage5 from "../assets/interior-photos/kids-room.png";
import interiorImage6 from "../assets/interior-photos/wardrobe.jpg";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Home = () => {
    const [area, setArea] = useState(0);
    const [unit, setUnit] = useState("feet");
    const [length, setLength] = useState("");
    const [width, setWidth] = useState("");

    const [costType, setCostType] = useState(1450);
    const [floors, setFloors] = useState(1);
    const [totalCost, setTotalCost] = useState(0);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        project_type: "Floor",
        details: "",
      });

    // const swiper = new Swiper(...);

    useEffect(() => {
        // Dynamically add the AI Chatbox script
        const script = document.createElement("script");
        script.src = "https://widget.cxgenie.ai/widget.js";
        script.dataset.aid = "bac054ad-1035-4a6e-94af-dfe12376fb0c";
        script.dataset.lang = "en";
        script.async = true;
        document.body.appendChild(script);

        // Cleanup script on component unmount
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handleContactSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch(`${BACKEND_URL}/form/contact`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        console.log(res);
    };

    const calculateArea = () => {
        const calculatedArea =
            unit === "meters" ? length * width * 10.764 : length * width;
        setArea(calculatedArea);
    };

    const calculateTotalCost = () => {
        setTotalCost(costType * area * floors);
    };

    const caraouselImages = [
        {
            image: interiorImage1,
            heading: "Living Room",
            subHeading: "Sleek and Stylish Design",
            path: "livingRoom"
        },
        {
            image: interiorImage2,
            heading: "Kitchen Space",
            subHeading: "Comfort Meets Elegance",
            path: "kitchen"
        },
        {
            image: interiorImage3,
            heading: "Master Bedroom",
            subHeading: "Comfort Redefined",
            path: "bedroom"
        },
        {
            image: interiorImage4,
            heading: "Dining Room",
            subHeading: "Family Gatherings",
            path: "diningRoom"
        },
        {
            image: interiorImage5,
            heading: "Kid's Bedroom",
            subHeading: "Fun and Functional",
            path: "kidsRoom"
        },
        {
            image: interiorImage6,
            heading: "Wardrobe",
            subHeading: "Effective and Accessible",
            path: "wardrobe"
        },
    ];

    const featuredData = {
        datasets: [
            {
                name: "Ongoing Projects",
                value: 221568,
                fill: "#41C9E0",
            },
            {
                name: "Completed Projects",
                value: 175355,
                fill: "#ACE041",
            },
            {
                name: "Happy Customers",
                value: 221548,
                fill: "#E08941",
            },
        ],
        colors: ["#FFF", "#36A2EB", "#FFCE56"],
    };

    return (
        <div className="content-wrapper">
            <div className="content-1">
                <section id="home" className="hero-title">
                    <h3>
                        Everything Your Home Needs
                        <br /> — At One Place
                    </h3>
                </section>
                <section className="hero-cta">
                    <Link to="/projects">
                        Start Your Project                    
                    </Link>
                    <Link to="/experts">
                        Find Professionals
                    </Link>
                </section>
            </div>
            <div className="feature-container">
                <div className="feature-strip">
                    <div className="feature-chart">
                        <PieChartComp chartData={featuredData} />
                    </div>
                    <div className="feature-list">
                        {featuredData.datasets.map((item) => (
                            <div className="feature-item" key={item.name}>
                                <div className="feature-item-container">
                                    <div
                                        className="feature-color"
                                        style={{
                                            backgroundColor: `${item.fill}`,
                                        }}
                                    ></div>
                                    <h3 className="feature-title">
                                        {item.name}
                                    </h3>
                                    <span>:</span>
                                    <p className="feature-data">{item.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="content-2">
                <div className="content-title">
                    <h3>Featured Options</h3>
                </div>
                <div className="wrapper">
                    {caraouselImages.map((item, index) => (
                        <Link to={`/feature/${item.path}`} className="item" id={`item-${index}`} key={`item-${index}`}>
                            <div className="item-image">
                                <img
                                    src={item.image}
                                    alt=""
                                    id={`image-${index}`}
                                />
                            </div>
                            <div className="item-detail">
                                <div className="item-desc">
                                    <div className="item-heading">
                                        <h3>{item.heading}</h3>
                                    </div>
                                    <div className="item-subHeading">
                                        <h5>{item.subHeading}</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="overlay">
                                        
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <div className="content-3">
                <div className="content-title">
                    <h3>Testimonials</h3>
                </div>
                <div className="testimonials">
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={30}
                        loop={true}
                        autoplay={{
                            delay: 8500,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            768: {
                                slidesPerView: 3,
                                autoplay: { delay: 2000 },
                            },
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        navigation={true}
                        modules={[Autoplay, Pagination, Navigation]}
                        className="mySwiper"
                    >
                        <SwiperSlide>
                            <ProfileCard></ProfileCard>
                        </SwiperSlide>
                        <SwiperSlide>
                            <ProfileCard></ProfileCard>
                        </SwiperSlide>
                        <SwiperSlide>
                            <ProfileCard></ProfileCard>
                        </SwiperSlide>
                        <SwiperSlide>
                            <ProfileCard></ProfileCard>
                        </SwiperSlide>
                        <SwiperSlide>
                            <ProfileCard></ProfileCard>
                        </SwiperSlide>
                        <SwiperSlide>
                            <ProfileCard></ProfileCard>
                        </SwiperSlide>
                        <SwiperSlide>
                            <ProfileCard></ProfileCard>
                        </SwiperSlide>
                        <SwiperSlide>
                            <ProfileCard></ProfileCard>
                        </SwiperSlide>
                        <SwiperSlide>
                            <ProfileCard></ProfileCard>
                        </SwiperSlide>
                        <SwiperSlide>
                            <ProfileCard></ProfileCard>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
            <div className="content-4">
                <div className="cal-wrapper">
                    <div className="calculator-container area-calculator">
                        <h1>Area Calculator</h1>
                        <div className="result-section">
                            <h3>Result</h3>
                            <h3>Area: {area.toFixed(2)} sq ft</h3>
                        </div>
                        <div className="unit-section">
                            <label>Select Unit:</label>
                            <div className="unit-options">
                                <input
                                    type="radio"
                                    id="meters"
                                    name="unit"
                                    value="meters"
                                    onChange={() => setUnit("meters")}
                                />
                                <label htmlFor="meters">Meters</label>
                                <input
                                    type="radio"
                                    id="feet"
                                    name="unit"
                                    value="feet"
                                    defaultChecked
                                    onChange={() => setUnit("feet")}
                                />
                                <label htmlFor="feet">Feet</label>
                            </div>
                        </div>
                        <div className="input-section">
                            <div className="input-group">
                                <label htmlFor="length">Length (l)</label>
                                <input
                                    type="number"
                                    id="length"
                                    placeholder="Enter length"
                                    value={length}
                                    onChange={(e) =>
                                        setLength(Number(e.target.value))
                                    }
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="width">Width (w)</label>
                                <input
                                    type="number"
                                    id="width"
                                    placeholder="Enter width"
                                    value={width}
                                    onChange={(e) =>
                                        setWidth(Number(e.target.value))
                                    }
                                />
                            </div>
                        </div>
                        <button onClick={calculateArea}>Calculate Area</button>
                    </div>

                    <div className="calculator-container cost-calculator">
                        <h1>Cost Calculator</h1>
                        <div className="result-section cost-result">
                            <h3>Total Estimated Cost: {totalCost} INR</h3>
                        </div>
                        <div className="input-section">
                            <div className="input-group">
                                <label htmlFor="type">
                                    Select Construction Type:
                                </label>
                                <select
                                    id="type"
                                    onChange={(e) =>
                                        setCostType(Number(e.target.value))
                                    }
                                >
                                    <option value="1450">Simple</option>
                                    <option value="2800">Moderate</option>
                                    <option value="5800">Luxury</option>
                                </select>
                            </div>
                            <div className="input-group">
                                <label htmlFor="floors">
                                    Number of Floors:
                                </label>
                                <input
                                    type="number"
                                    id="floors"
                                    min="1"
                                    value={floors}
                                    onChange={(e) =>
                                        setFloors(Number(e.target.value))
                                    }
                                />
                            </div>
                        </div>

                        <button onClick={calculateTotalCost}>
                            Calculate Cost
                        </button>
                    </div>
                </div>
            </div>
            <div className="content-5">
                <div className="form-wrapper">
                    <div className="professional-form-section">
                        <h2>Get Started with Your Project</h2>
                        <form
                            className="main-form"
                            onSubmit={handleContactSubmit}
                        >
                            <label htmlFor="name">Full Name:</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({ ...formData, name: e.target.value })
                                }
                                required
                                />
                            <label htmlFor="email">Email Address:</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Your Email"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({ ...formData, email: e.target.value })
                                }
                                required
                                />
                            <label htmlFor="phone">Phone Number:</label>
                            <input
                                type="tel"
                                id="phone"
                                placeholder="Your Phone Number"
                                value={formData.phone}
                                onChange={(e) =>
                                    setFormData({ ...formData, phone: e.target.value })
                                }
                                required
                                />
                            <label htmlFor="project-type">
                                Type of Project:
                            </label>
                            <select 
                                id="project-type"
                                value={formData.project_type}
                                onChange={(e) =>
                                    setFormData({ ...formData, project_type: e.target.value })
                                }
                                required
                            >
                                <option value="Floor">
                                    Floor Plans
                                </option>
                                <option value="Interior">
                                    Interior Design
                                </option>
                                <option value="Other">Other</option>
                            </select>
                            <label htmlFor="details">Project Details:</label>
                            <textarea
                                id="details"
                                rows="4"
                                placeholder="Briefly describe your project requirements..."
                                value={formData.details}
                                onChange={(e) =>
                                    setFormData({ ...formData, details: e.target.value })
                                }
                            ></textarea>
                            <button type="submit">
                                Submit Your Requirements
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            {/* <div className="content-6">
                <div className="ceo-cto-container">
                    <img
                        src={CtoPhoto}
                        alt="CEO & CTO"
                        className="ceo-cto-photo"
                    />
                    <div className="message">
                        <h3>Message from the Founder & CTO</h3>
                        <p>
                            At URBAN GRIH, we believe that great design has the
                            power to transform lives. Our mission is to bring
                            your vision to life by creating beautiful and
                            functional spaces that truly reflect your unique
                            style and needs. We are passionate about delivering
                            exceptional design solutions and are committed to
                            providing our clients with an outstanding experience
                            from start to finish.
                        </p>
                        <p>
                            Thank you for choosing URBAN GRIH. We look forward
                            to working with you to create the home of your
                            dreams.
                        </p>
                        <p>
                            <strong>
                                UJJWAL KULSHRESTHA
                                <br />
                                Founder & CTO, URBAN GRIH
                            </strong>
                        </p>
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default Home;
