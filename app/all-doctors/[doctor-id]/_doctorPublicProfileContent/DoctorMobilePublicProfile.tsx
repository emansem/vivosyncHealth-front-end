import ImageComponent from "@/src/components/utils/Image";
import {
  Languages,
  LucideProps,
  NotebookTabs,
  Star,
  StarIcon,
  Users
} from "lucide-react";
import React, {
  ForwardRefExoticComponent,
  RefAttributes,
  useState
} from "react";
import { FaBookMedical } from "react-icons/fa";
import { ReviewSection } from "./ReviewSection";
import { useSubscriptionPlan } from "@/src/hooks/useSubscriptionPlan";
interface StateHeadingProps {
  HeadIcon?: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  title: string;
}

const AvatarSection = () => {
  const imageStyle = `w-20 h-20 min-w-20 min-h-20`;
  const altAttribute = "Dr name";
  return (
    <div className="flex items-start gap-4">
      <div>
        <ImageComponent altAttribute={altAttribute} imageStyle={imageStyle} />
      </div>
      <div>
        <p className="text-2xl capitalize font-medium  text-stone-800 ">
          Dr.Fang Rambo
        </p>
        <p className="text-base  text-text_color2">Dental Speciality</p>
        <p className="text-base  text-text_color2">St.Louis hospital</p>
      </div>
    </div>
  );
};
const StatesSection = () => {
  const stateStyles = {
    statesPtag: `flex  items-center gap-3`,
    stateIconSize: 20,
    iconColor: "#269c65",
    starColor: "#facc15 ",
    stateDivStyle: "flex flex-col item-center ",
    stateSpanTag: "text-sm text-text_color2 ",
    state: "text-lg text-stone-700 font-medium"
  };

  return (
    <div>
      <ul className="flex flex-col gap-5">
        <li className="flex items-center py-2 px-4 shadow-shadow justify-between">
          <p className={stateStyles.statesPtag}>
            <span className="p-2 rounded-full shadow-shadow3 bg-white">
              <StarIcon
                fill={stateStyles.starColor}
                size={stateStyles.stateIconSize}
                color={stateStyles.starColor}
              />
            </span>
            <div className={stateStyles.stateDivStyle}>
              <span className={stateStyles.state}>4.6</span>
              <span className={stateStyles.stateSpanTag}>Ratings</span>
            </div>
          </p>
          <p className={stateStyles.statesPtag}>
            <span className="p-2 rounded-full shadow-shadow3 bg-white">
              <FaBookMedical
                color={stateStyles.iconColor}
                size={stateStyles.stateIconSize}
              />
            </span>
            <div className={stateStyles.stateDivStyle}>
              <span className={stateStyles.state}>5 years </span>
              <span className={stateStyles.stateSpanTag}>Experience</span>
            </div>
          </p>
          <p className={stateStyles.statesPtag}>
            <span className="p-2 rounded-full shadow-shadow3 bg-white">
              <Users
                color={stateStyles.iconColor}
                size={stateStyles.stateIconSize}
              />
            </span>
            <div className={stateStyles.stateDivStyle}>
              <span className={stateStyles.state}>500</span>
              <span className={stateStyles.stateSpanTag}>Total Patients</span>
            </div>
          </p>
        </li>
        <li className="flex bg-primary_color/10  py-4 p-4 text-center rounded-xl items-center justify-between">
          <p className="flex gap-1 flex-col">
            <span className={stateStyles.state}>Cameroon</span>
            <span className={stateStyles.stateSpanTag}>Country</span>
          </p>
          <p className="flex gap-1 flex-col">
            <span className={stateStyles.state}>Yaounde </span>
            <span className={stateStyles.stateSpanTag}>City</span>
          </p>
          <p className="flex gap-1 flex-col">
            <span className={stateStyles.state}>546</span>
            <span className={stateStyles.stateSpanTag}>Reviews</span>
          </p>
        </li>
      </ul>
    </div>
  );
};
const StateHeading = ({ HeadIcon, title }: StateHeadingProps) => {
  return (
    <div className="flex items-center gap-2 py-3">
      <h1 className="text-lg  font-medium text-stone-700 ">{title}</h1>
    </div>
  );
};

const LanguagesSection = () => {
  const stateExtraStyle = `text-base text-primary_color bg-primary_color/10  block py-1 px-4 rounded-full`;
  return (
    <div>
      <StateHeading HeadIcon={Languages} title="Languages" />
      <div className="flex items-center flex-wrap gap-3">
        <span className={stateExtraStyle}>English</span>
        <span className={stateExtraStyle}>French</span>
        <span className={stateExtraStyle}>Spanish</span>
      </div>
    </div>
  );
};

const AboutSection = () => {
  const aboutDetails = ` Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos porro
          necessitatibus fuga dolores facilis quos qui tempora, quaerat maxime
          praesentium unde dicta? Eius, voluptatum! Eveniet soluta adipisci
          corporis neque cupiditate. Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Ab rerum, magni eveniet autem quidem illo molestiae
          similique accusamus. Placeat, amet nam? Iste beatae sunt quia quas.
          Facilis mollitia eos consequuntur. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Accusamus, dicta neque? Tempora quod
          aperiam totam sunt soluta, esse, nisi porro eius deserunt eos vel illo
          iusto in harum, magnam aut.`;
  const [isOpen, setIsopen] = useState(false);
  const handleSeeMore = () => {
    setIsopen((prev) => !prev);
  };
  return (
    <div>
      <StateHeading HeadIcon={Languages} title="About Dr.Fang Rambo" />
      <div>
        <p className="text-base leading-6 text-text_color2">
          {isOpen ? aboutDetails : `${aboutDetails.slice(0, 200)}...`}
          <span
            className="text-lg text-primary_color cursor-pointer"
            onClick={handleSeeMore}
          >
            {isOpen ? " See Less" : "See More"}
          </span>
        </p>
      </div>
    </div>
  );
};

const WorkingDays = () => {
  const stateExtraStyle = `text-base text-primary_color bg-primary_color/10  block py-1 px-4 rounded-full`;
  return (
    <div>
      <StateHeading HeadIcon={NotebookTabs} title="Working Days" />
      <div className="flex items-center flex-wrap gap-3">
        <span className={stateExtraStyle}>Monday</span>
        <span className={stateExtraStyle}>Tuesday</span>
        <span className={stateExtraStyle}>Wednesday</span>
        <span className={stateExtraStyle}>Thursday</span>
        <span className={stateExtraStyle}>Friday</span>
      </div>
    </div>
  );
};

function DoctorMobilePublicProfile() {
  const { handleToggle, activeIndices } = useSubscriptionPlan();
  return (
    <div className="bg-white relative flex flex-col gap-4 p-4 rounded-md">
      <AvatarSection />
      <StatesSection />
      <AboutSection />

      <LanguagesSection />
      <WorkingDays />
      <ReviewSection
        activeIndices={activeIndices}
        handleToggleReviews={handleToggle}
      />
    </div>
  );
}

export default DoctorMobilePublicProfile;
