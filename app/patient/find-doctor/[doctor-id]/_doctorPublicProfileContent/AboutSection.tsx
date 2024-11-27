import { Star } from "lucide-react";
import Image from "next/image";
const Styles = {
  aboutSectionList: `grid grid-cols-2  place-content-between gap-10`,
  aboutSectionListItem: `flex  my-2 gap-1 flex-col`,
  aboutSectionListHeading: `text-[18px] text-stone-700 font-medium`,
  aboutSectionListSubheading: `text-base text-text_color2 font-normal`
};
export const AboutSection = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex  items-start gap-4 ">
        <div className="relative cursor-pointer w-8 h-18 min-w-20 min-h-20  md:w-20 md:h-20 rounded-full overflow-hidden">
          <Image
            src="https://i.postimg.cc/026P6nxK/image.jpg"
            alt="Dr eman sem"
            fill
            sizes="100px"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xl text-stone-700  font-medium">Dr.Eman sem</p>
          <p className="text-base  text-text_color2 font-normal">
            Making Clients Reimagine Their Online Presence
          </p>
          <p className="flex gap-1">
            <Star fill="#facc15" color="#facc15" />
            <span className="text-stone-600"> 5.0(123)</span>
          </p>
        </div>
      </div>
      <div className="w-full bg-gray-50 rounded-md p-5">
        <ul className="w-full ">
          <li className={Styles.aboutSectionList}>
            <p className={Styles.aboutSectionListItem}>
              <span className={`${Styles.aboutSectionListHeading}`}>
                Country
              </span>
              <span className={`${Styles.aboutSectionListSubheading}`}>
                Cameroon
              </span>
            </p>
            <p className={Styles.aboutSectionListItem}>
              <span className={`${Styles.aboutSectionListHeading}`}>
                Speciality
              </span>
              <span className={`${Styles.aboutSectionListSubheading}`}>
                Doctor
              </span>
            </p>
          </li>
          <li className={Styles.aboutSectionList}>
            <p className={Styles.aboutSectionListItem}>
              <span className={`${Styles.aboutSectionListHeading}`}>
                Years of experiences
              </span>
              <span className={`${Styles.aboutSectionListSubheading}`}>
                16 Years
              </span>
            </p>
            <p className={Styles.aboutSectionListItem}>
              <span className={`${Styles.aboutSectionListHeading}`}>
                Medical license
              </span>
              <span className={`${Styles.aboutSectionListSubheading}`}>
                DOCTOREXAMPLE
              </span>
            </p>
          </li>
          <li className={Styles.aboutSectionList}>
            <p className={Styles.aboutSectionListItem}>
              <span className={`${Styles.aboutSectionListHeading}`}>
                Languages
              </span>
              <span className={`${Styles.aboutSectionListSubheading}`}>
                English, French, German
              </span>
            </p>
            <p className={Styles.aboutSectionListItem}>
              <span className={`${Styles.aboutSectionListHeading}`}>
                Availiability
              </span>
              <span className={`${Styles.aboutSectionListSubheading}`}>
                Mon Tue ,Wed, Sat
              </span>
            </p>
          </li>
        </ul>
      </div>
      <div>
        <h1 className="text-xl text-stone-700 font-semibold">
          About Dr. Alex Rivers
        </h1>

        <p className="py-2 text-base leading-6 text-text_color2 li md:text-[18px]">
          My expertise lies in integrative medicine, where I blend traditional
          medical practices with holistic approaches to ensure comprehensive
          care. Trained at Johns Hopkins, with further specialization in
          neurology and functional medicine at Harvard, I&apos;ve seen
          first-hand the limitations of conventional treatments. This led me to
          explore and integrate alternative therapies like acupuncture, dietary
          therapy, and mindfulness, tailoring treatments to not only heal the
          body but also nurture the mind and spirit.
        </p>
      </div>
    </div>
  );
};
