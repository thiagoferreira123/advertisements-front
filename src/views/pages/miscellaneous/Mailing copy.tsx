/* eslint-disable react/no-danger */
import React from 'react';
import { LAYOUT } from '/src/constants';
import HtmlHead from '/src/components/html-head/HtmlHead';
import BreadcrumbList from '/src/components/breadcrumb-list/BreadcrumbList';
import useCustomLayout from '/src/hooks/useCustomLayout';

const MiscellaneousMailing = () => {
  const title = 'Mailing';
  const description = 'Mailing';

  const breadcrumbs = [
    { to: '', text: 'Home' },
    { to: 'pages', text: 'Pages' },
    { to: 'pages/miscellaneous', text: 'Miscellaneous' },
  ];

  useCustomLayout({ layout: LAYOUT.Boxed });

  return (
    <>
      <HtmlHead title={title} description={description} />
      {/* Title Start */}
      <div className="page-title-container">
        <h1 className="mb-0 pb-0 display-4">{title}</h1>
        <BreadcrumbList items={breadcrumbs} />
      </div>
      {/* Title End */}

      <div
        dangerouslySetInnerHTML={{
          __html: `
          <div
          style="
            height: auto !important;
            max-width: 600px !important;
            font-family: Helvetica, Arial, sans-serif !important;
            margin-bottom: 40px;
            margin-left: auto;
            margin-right: auto;
          "
        >
          <!-- Basic Start -->
          <div style="margin-bottom: 100px">
            <table
              style="
                max-width: 600px;
                background-color: #ffffff;
                border: none;
                border-collapse: separate !important;
                border-radius: 16px;
                border-spacing: 0;
                color: #4e4e4e;
                margin: 0;
                padding: 32px;
                font-size: 14px;
                font-weight: 400;
                line-height: 1.5;
                box-shadow: 0 4px 10px rgb(0 0 0/3%) !important;
              "
            >
              <tbody>
                <tr>
                  <td>
                    <img src="/img/logo/logo-blue-light.svg" alt="logo" style="width: 128px; margin-bottom: 30px; clear: both; display: inline-block" />
                    <br />
                    <h6 style="display: inline-block; font-size: 16px; margin: 10px 0; font-weight: 500">Temos boas noticias! 🥳</h6>
                    <div>
                      <p>
                        Toffee croissant icing toffee. Sweet roll chupa chups marshmallow muffin liquorice chupa chups soufflé bonbon. Liquorice gummi bears cake
                        donut chocolate lollipop gummi bears. Cotton candy cupcake ice cream gummies dessert muffin chocolate jelly. Danish brownie chocolate bar
                        lollipop cookie tootsie roll candy canes. Jujubes lollipop cheesecake gummi bears cheesecake. Cake jujubes soufflé.
                      </p>
                      <p>
                        Cake chocolate bar biscuit sweet roll liquorice jelly jujubes. Gingerbread icing macaroon bear claw jelly toffee. Chocolate cake marshmallow
                        muffin wafer. Pastry cake tart apple pie bear claw sweet. Apple pie macaroon sesame snaps cotton candy jelly
                        <u>pudding lollipop caramels</u>
                        marshmallow.
                      </p>
                      <h6 style="display: inline-block; font-size: 16px; margin: 10px 0; font-weight: 500">Sesame Snaps Lollipop Macaroon</h6>
                      <ul style="list-style: none; padding-left: 0">
                        <li>Croissant</li>
                        <li>Sesame snaps</li>
                        <li>Ice cream</li>
                        <li>Candy canes</li>
                        <li>Lemon drops</li>
                      </ul>
                      <h6 style="display: inline-block; font-size: 16px; margin: 10px 0; font-weight: 500">Muffin Sweet Roll Apple Pie</h6>
                      <p>
                        Carrot cake gummi bears wafer sesame snaps soufflé cheesecake cheesecake cake. Sweet roll apple pie tiramisu bonbon sugar plum muffin sesame
                        snaps chocolate. Lollipop sweet roll sesame snaps powder. Wafer halvah chocolate soufflé icing.
                      </p>
                      <h6 style="display: inline-block; font-size: 16px; margin: 10px 0; font-weight: 500">Muffin Sweet Roll Apple Pie</h6>
                      <p>
                        Cotton candy cupcake ice cream gummies dessert muffin chocolate jelly. Danish brownie chocolate bar roll candy canes. Jujubes cheesecake
                        gummi bears cheesecake.
                      </p>
                      <div style="text-align: center; margin-top: 10px">
                        <button type="submit" style="cursor: pointer; padding: 11px 35px; color: #fff; background-color: #2499e3; border: none; border-radius: 8px">
                          Validate
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <table style="margin-top: 30px; padding-bottom: 20px; margin-bottom: 40px; width: 600px">
              <tbody>
                <tr>
                  <td style="text-align: center; vertical-align: center">
                    <p style="font-size: 10px; text-decoration: none; line-height: 1; color: #afafaf; margin-top: 0px">
                      Email enviado automaticamente por
                      <a href="https://OdontCloud.com.br/" style="color: #2499e3; text-decoration: none">OdontCloud - Software para  Cirurgiões-Dentistas</a>
                      .
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- Basic End -->
         `,
        }}
      />
    </>
  );
};

export default MiscellaneousMailing;
