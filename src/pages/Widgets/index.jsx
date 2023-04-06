import React from "react";
// button
import Button from "@components/SharedComponents/Button";
import Typography from "@components/SharedComponents/Typography";
// react-icons
import Icons from "@helper/icons";

export default function Widgets() {
  return (
    <>
      <div className="widgets-wrapper p-5">
        <h2 className="text-center text-success fs-1 fw-bold">Widgets</h2>
        <hr className="my-4" />
        {/* buttons-start */}
        <h3 className="text-danger fs-2 fw-semibold">1. Button</h3>
        <div className="p-4 d-flex flex-wrap">
          <div className="me-5">
            <h1 className="fs-5 fw-semibold mb-3">
              1. (Fill) (Large){" "}
              <span className="text-decoration-line-through">(Icon)</span>
            </h1>
            <Button type="button">Large Btn</Button>
          </div>
          <div className="me-5">
            <h1 className="fs-5 fw-semibold mb-3">2. (Fill) (Large) (Icon)</h1>
            <Button
              type="button"
              startIcon={<Icons.BsIcons.BsPlusCircleFill />}
            >
              Large Btn
            </Button>
          </div>
          <div className="me-5">
            <h1 className="fs-5 fw-semibold mb-3">
              3. (Outline) (Large) (Icon)
            </h1>
            <Button
              type="button"
              startIcon={<Icons.BsIcons.BsPlusCircleFill />}
              variant="outline"
            >
              Large Btn
            </Button>
          </div>
          <div className="me-5">
            <h1 className="fs-5 fw-semibold mb-3">4. (Fill) (Medium) (Icon)</h1>
            <Button
              type="button"
              startIcon={<Icons.BsIcons.BsPlusCircleFill />}
              btn="secondary"
              size="md"
            >
              meduim btn
            </Button>
          </div>
          <div className="me-5">
            <h1 className="fs-5 fw-semibold mb-3">
              5. (Fill) (small){" "}
              <span className="text-decoration-line-through">(Icon)</span>
            </h1>
            <Button type="button" btn="secondary" size="sm">
              small btn
            </Button>
          </div>
        </div>
        {/* buttons-end */}
        <hr className="my-4" />
        {/* Typography-start */}
        <h3 className="text-danger fs-2 fw-semibold">2. Typography</h3>
        <div className="p-4">
          <Typography variant="h1" fw="bold">
            Heading One 40px
          </Typography>
          <Typography variant="h2" fw="semibold">
            Heading Two 24px
          </Typography>
          <Typography variant="h3" fw="bold">
            Heading Three 18px
          </Typography>
          <Typography variant="body1">
            (Body One 16px) Lorem ipsum dolor sit, amet consectetur adipisicing
            elit. Modi soluta mollitia nihil itaque possimus, eligendi illo
            distinctio, excepturi, quo quidem illum nam consequuntur! Eius, quo.
            Quis eveniet, in suscipit, saepe omnis corporis ipsam vel quod sunt
            eaque quas. Inventore quisquam repellendus doloremque, tenetur
            dolores eveniet voluptate placeat? Amet qui, odit quisquam ratione
            dolore quasi quidem, quas dolorem autem debitis consequatur?
          </Typography>
          <Typography variant="body2">
            (Body Two 14px) Lorem ipsum dolor sit amet, consectetur adipisicing
            elit. Doloremque obcaecati quaerat in architecto praesentium.
            Praesentium distinctio aut sit? Quam eum sapiente, numquam est
            nesciunt ab explicabo praesentium! Vero cumque, blanditiis amet
            voluptates suscipit sint. Doloremque iste recusandae dignissimos
            nobis soluta nihil nostrum rerum ipsum sunt ducimus officiis eaque
            perferendis cum sit possimus in molestias, modi dicta. Beatae dicta
            sunt fugiat.
          </Typography>
          <Typography variant="small">
            (Small 12px) Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Magni perferendis dicta mollitia itaque laudantium placeat
            aspernatur odio ab minima quos, ut id totam assumenda fuga modi
            veniam esse dolore iure eligendi quam culpa! Id vitae sapiente
            minima ducimus pariatur placeat voluptatibus facilis quibusdam
            accusamus, autem laborum cupiditate delectus natus laboriosam
            dolorum, iusto blanditiis. Ipsa labore consequuntur quia vitae,
            corrupti quibusdam tempora. Nobis unde nesciunt ratione nulla
            ducimus eligendi distinctio, sed earum saepe fugit iure assumenda
            mollitia aliquam? Nam, autem eius!
          </Typography>
        </div>
        {/* Typography-end */}
      </div>
    </>
  );
}
