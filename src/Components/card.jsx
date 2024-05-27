// card.jsx
import React, { useState, useRef } from "react";
import "./card.css";


const Card = () => {
  const [xRotation, setXRotation] = useState(0);
  const [yRotation, setYRotation] = useState(0);
  const cardRef = useRef(null);
  const imgRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const sizesboxRef = useRef(null);
  const purchaseRef = useRef(null);

  const handleMouseMove = (event) => {
    const card = cardRef.current;
    const { offsetWidth: width, offsetHeight: height } = card;
    const { clientX, clientY } = event;
    const x = clientX - card.offsetLeft - width / 2;
    const y = clientY - card.offsetTop - height / 2;
    const mult = 40;
    setXRotation((y / height) * mult);
    setYRotation((x / width) * mult);
  };

  const handleMouseEnter = () => {
    const img = imgRef.current;
    const title = titleRef.current;
    const sizesBox = sizesboxRef.current;
    const purchase = purchaseRef.current;
    const desc = descRef.current;
    if (img && title && sizesBox && purchase && desc) {
      title.style.transform = "translateZ(150px)";
      img.style.transform = "translateZ(100px) rotateZ(-45deg)";
      sizesBox.style.transform = "translateZ(100px)";
      purchase.style.transform = "translateZ(75px)";
      desc.style.transform = "translateZ(75px)";
    }
  };

  const handleMouseLeave = () => {
    setXRotation(0);
    setYRotation(0);

    const img = imgRef.current;
    const title = titleRef.current;
    const sizesBox = sizesboxRef.current;
    const purchase = purchaseRef.current;
    if (img && title && sizesBox && purchase) {
      title.style.transform = "translateZ(0px)";
      img.style.transform = "translateZ(0px) rotateZ(0deg)";
      sizesBox.style.transform = "translateZ(0px)";
      purchase.style.transform = "translateZ(0px)";
    }
  };

  return (
    <div
      className="card"
      ref={cardRef}
      style={{
        transform: `rotateX(${xRotation}deg) rotateY(${yRotation}deg)`,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        ref={imgRef}
        src={"./src/assets/images/cake.png"}
        alt="Nike-Shoe"
        className="sneaaker-img"
      />
      <h1 className="title" ref={titleRef}>
        Chocolate Cake
      </h1>
      <p ref={descRef}>
        Indulge in the heavenly delight of our Special Celebration Cake. This
        exquisite cake is crafted with the finest ingredients to make your
        moments memorable.
      </p>
      {/* Uncomment the following lines if you have sizesboxRef */}
      {/* <ul className="sizes-box" ref={sizesboxRef}>
        <li>38</li>
        <li>40</li>
        <li>42</li>
        <li>44</li>
      </ul> */}
      <div className="button-box" ref={purchaseRef}>
        <button className="purchase">Purchase</button>
      </div>
    </div>
  );
};

export default Card;
