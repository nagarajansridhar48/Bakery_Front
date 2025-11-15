import React, { useEffect } from "react";
import Nav from "../../Nav";
import Footer from "../../Footer";

const Aboutus = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <Nav />
      <div className="bg-white">
        {/* Hero Section */}
        <section className="text-center py-16 px-4 sm:px-6 lg:px-20 lg:mt-18 md:mt-18 sm:mt-16 bg-cream">
          <h1 className="text-3xl md:text-5xl font-bold text-dark mb-6 leading-snug">
            About Sweet Heart
          </h1>
          <p className="text-base md:text-xl text-choco max-w-3xl mx-auto">
            Life is sweeter with us – where every bite is filled with love,
            tradition, and joy.
          </p>
        </section>

        {/* Our Story */}
        <section className="bg-beige py-16 px-4 sm:px-6 lg:px-20">
          <h2 className="text-3xl md:text-5xl font-bold text-dark mb-6 text-center md:text-center">
            Our Story
          </h2>
          <div className="max-w-5xl mx-auto text-choco text-sm sm:text-base md:text-lg leading-relaxed space-y-4">
            <p>
              At <span className="font-semibold text-caramel">Sweet Heart</span>,
              , we believe that sweetness is more than just taste — it’s a feeling, a memory, and a connection. What began as a humble dream in a small kitchen has blossomed into a beloved destination for those who cherish authentic flavors and heartfelt experiences.
            </p>
            <p>
              We started our journey with one simple goal: to make people smile through food. From our very first golden laddu shared at a family gathering to the grandest celebration cakes crafted for life’s biggest milestones, every creation has carried the same essence — love, care, and authenticity.
            </p>
            <p>
                But Sweet Heart is not just a sweet shop. It’s a bridge between tradition and innovation. While we honor the recipes passed down through generations, we also embrace creativity to bring new twists that surprise and delight. Every sweet, every savory, every cake tells a story — a story of culture, passion, and celebration.
            </p>
            <p>
                Our growth has never been about numbers or sales; it has always been about hearts touched and memories made. Whether it’s a child’s first bite of a soft gulab jamun, a couple’s wedding mithai box, or a festive box of assorted savories shared among friends, we are proud to be a part of people’s happiest moments.
            </p>
            <p>
                At Sweet Heart, we don’t just create food — we create bonds, traditions, and smiles that last a lifetime.
            </p>
          </div>
        </section>

        {/* What Makes Us Different */}
        <section className="bg-cream py-16 px-4 sm:px-6 lg:px-20">
          <h2 className="text-3xl md:text-5xl font-bold text-dark text-center mb-10">
            What Makes Us Different?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 max-w-6xl mx-auto">
            {[
              {
                title: "✨ Heartfelt Recipes",
                desc: "Blending age-old traditions with modern creativity.",
              },
              {
                title: "✨ Premium Ingredients",
                desc: "Only the freshest and finest ingredients go into our sweets.",
              },
              {
                title: "✨ Made with Love",
                desc: "Every sweet is prepared with passion and care.",
              },
              {
                title: "✨ Celebrating Moments",
                desc: "From small joys to grand celebrations, we make them unforgettable.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl shadow-2xl hover:shadow-lg bg-gradient-to-r from-choco to-caramel transition-transform text-center text-cream"
              >
                <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
                <p className="text-sm sm:text-base">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Our Promise */}
        <section className="bg-beige py-16 px-4 sm:px-6 lg:px-20 text-center">
          <h2 className="text-3x md:text-5xl font-bold text-dark mb-6">
            Our Promise
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-choco max-w-3xl mx-auto leading-relaxed">
            At Sweet Heart, we don’t just serve food — we serve happiness. Whether
            it’s a wedding, a festival, or a simple moment of indulgence, our
            mission is to make it sweeter, warmer, and more memorable.
          </p>
        </section>

        {/* Closing Quote */}
        <section className="bg-gradient-to-r from-mint to-caramel py-12 text-center text-dark">
          <p className="text-base sm:text-lg md:text-xl italic max-w-3xl mx-auto leading-relaxed">
            “Life is sweeter when shared. With Sweet Heart, every bite is a
            celebration of love, tradition, and joy. Thank you for making us a
            part of your sweetest moments.”
          </p>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Aboutus;