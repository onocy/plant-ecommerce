import React from "react";
import Navbar from "@/components/Navbar/Navbar";
import Image from "next/image";
import Footer from "@/components/Footer/Footer";

const About = () => {
  return (
    <>
      <div className="px-20">
        <div className="flex gap-4 mb-8 justify-center">
          <Image src="/images/about-2.png" width="300" height="200" alt="" />
          {/* <Image src="/images/about-1.png" width="800" height="100" alt="" /> */}
        </div>
        <div className="flex mb-3 justify-center">
          <img src="/logo.svg" width="50" height="50" className="pr-3" alt="" />
          <h1>Our Mission </h1>
        </div>
        <div className="flex flex-col gap-5">
          <div>
            In the heart of the bustling city of Chicago, the idea for Rośliny
            took root. The founder, Emilia Kowalski, a third-generation
            horticulturist, originally from Poland recognized a disconnect in
            the modern world: people craved the serenity of greenery in their
            homes and workplaces, yet the hustle of city life often made it
            difficult to access. She envisioned a platform that would bridge
            this gap, bringing lush foliage from the rich Polish countryside to
            the urban jungle. Emilia's passion for plants was more than just a
            hobby; it was a legacy handed down through generations, nurtured by
            the stories of her grandfather who tended to vast gardens during the
            austere post-war era, finding solace and freedom in the growth and
            bloom of each plant.
          </div>

          <div>
            Rośliny sprouted from a blend of tradition and technology. Emilia,
            with her keen understanding of the digital landscape, combined her
            heritage with an innovative approach to create an online haven for
            plant lovers. She began by curating a collection from local growers,
            emphasizing the unique flora that thrived in Poland's varied
            climates—from the misty highlands to the verdant plains. The
            platform was not just a store but a community hub where novices and
            aficionados alike could share their love for botany. Emilia's vision
            was clear: to foster a digital ecosystem where every plant had a
            story, every purchase a personal connection to the earth, and every
            customer a chance to cultivate their own green oasis.
          </div>
          <div>
            As Rośliny grew, so did its reputation, blossoming into a beacon for
            green living and a symbol of sustainability. It wasn't just about
            selling plants; it was about instilling a greener consciousness in
            the heart of urban centers. Emilia's initiative quickly spread
            beyond Kraków, rooting itself deeply in the ethos of cities across
            Europe. With each delivery, a piece of the pastoral Polish landscape
            found its way into homes, offices, and lives, bringing with it a
            breath of fresh air and a sense of peace. Rośliny became synonymous
            with a movement towards a more harmonious coexistence with nature, a
            testament to Emilia's dream of reconnecting people with the natural
            world in the digital age.
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
