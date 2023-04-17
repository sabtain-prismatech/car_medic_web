import React from "react";
// button
import Button from "@components/SharedComponents/Button";
import Typography from "@components/SharedComponents/Typography";
import Colors from "@components/SharedComponents/Colors";
import InputField from "@components/SharedComponents/InputField";
import Selectbox from "@components/SharedComponents/Selectbox";
import Checkbox from "@components/SharedComponents/Checkbox";
import Radio from "@components/SharedComponents/Radio";
// react-icons
import Icons from "@helper/icons";
// Formik
import { Formik, Form } from "formik";
import * as Yup from "yup";
// Static Data
import StaticData from "@config/config.json";

export default function Widgets() {
  //initial values
  const initialValues = {
    exampleOne: "",
    selectOne: "",
    checkOne: "",
    radioOne: "",
  };
  //validation
  const validationSchema = Yup.object().shape({
    exampleOne: Yup.string().required("Required"),
    selectOne: Yup.string().required("Required"),
  });
  // onSubmit
  const onSubmit = async (values) => {
    console.log(values);
    window.alert(JSON.stringify(values));
  };

  return (
    <>
      <div className="widgets-wrapper p-5">
        <h2 className="text-center text-success fs-1 fw-bold">Widgets</h2>
        <hr className="my-4" />
        {/* buttons-start */}
        <h3 className="text-danger fs-2 fw-bold">
          <u>1. Button</u>
        </h3>
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
        <h3 className="text-danger fs-2 fw-bold">
          <u>2. Typography</u>
        </h3>
        <div className="p-4">
          <Typography variant="h1" fw="bold" color="txt_primary">
            Heading One <span className="primary">40px</span>
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
        <hr className="my-4" />
        {/* color-utilites-start */}
        <h3 className="text-danger fs-2 fw-bold">
          <u>3. Colors Utilites</u>
        </h3>
        <div className="p-4">
          <Colors bg="#ff438c">
            Color = (.primary) , BG-Color = (.bg_primary)
          </Colors>
          <Colors bg="#93ddff"> BG-Color = (.bg_secondary)</Colors>
          <Colors bg="#505050">Text-Color = (.txt_primary) </Colors>
        </div>
        {/* color-utilites-end */}
        <hr className="my-4" />
        {/* Form-Start */}
        <h3 className="text-danger fs-2 fw-bold">
          <u>4. Form</u>
        </h3>
        <div className="p-4 ">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => (
              <Form>
                <div className="row border p-4 rounded">
                  <div className="col-4 mb-5">
                    <InputField
                      label="Large Input"
                      name="exampleOne"
                      formik={formik}
                      size="lg"
                      type="password"
                    />
                  </div>
                  <div className="col-4 mb-5">
                    <InputField
                      label="Meduim Input"
                      name="exampleOne"
                      formik={formik}
                    />
                  </div>
                  <div className="col-4">
                    <InputField
                      label="Small input"
                      name="exampleOne"
                      formik={formik}
                      size="sm"
                    />
                  </div>
                  <div className="col-4 mb-5">
                    <Selectbox
                      array={StaticData?.selectArray}
                      notSelected="Select Option"
                      label="Large Select"
                      name="selectOne"
                      formik={formik}
                      size="lg"
                    />
                  </div>
                  <div className="col-4 mb-5">
                    <Selectbox
                      array={StaticData?.selectArray}
                      notSelected="Select Option"
                      label="Medium Select"
                      name="selectOne"
                      formik={formik}
                    />
                  </div>
                  <div className="col-4 mb-5">
                    <Selectbox
                      array={StaticData?.selectArray}
                      notSelected="Select Option"
                      label="Small Select"
                      name="selectOne"
                      formik={formik}
                      size="sm"
                    />
                  </div>
                  <div className="col-4 mb-5">
                    <Checkbox label="One" name="checkOne" value="one" /> <br />
                    <Checkbox label="Two" name="checkOne" value="two" />
                    <br />
                    <Radio label="ONE" name="radioOne" value="one" /> <br />
                    <Radio label="TWO" name="radioOne" value="two" />
                  </div>
                  <button type="submit">Submit</button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        {/* Form-End */}
      </div>
    </>
  );
}
