import React, { useRef } from 'react';
import  emailjs  from '@emailjs/browser';
export default function ContactUs() {
    const form = useRef();
    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm("Gmail_cv60k5o","template_acwu8yy",form.current,'5JWk6V3ZLldyEg9bJ')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
      }
  return (
    <>
    {/* <!-- start contact --> */}

    {/* <!------ Include the above in your HEAD tag ----------> */}
   

    <div className="contact position-relative " id="contact">
        <div className="d-flex justify-content-center">
            <img className="image-con position-absolute  mw-100 mh-100 " src="/images/con2.jpg" alt="" />
        </div>
        <div className="section-content position-relative">
            <h1 className="section-header">Get in <span className="content-header wow fadeIn text-primary " data-wow-delay="0.2s"
                    data-wow-duration="2s"> Touch with us</span></h1>
        </div>
        <div className="contact-section position-relative">

            <div className="container">
                <form ref={form} onSubmit={sendEmail}>
                    <div className="row">
                        <div className="col-md-6 form-line">
                            <div className="form-group">
                                <label htmlFor="exampleInputUsername">Your name</label>
                                <input type="text" className="form-control" id="from_name" placeholder="" name="from_name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail">Email Address</label>
                                <input type="email" className="form-control" id="exampleInputEmail" placeholder=""  name="from_email"/>
                            </div>
                           
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="description"> Message</label>
                                <textarea className="form-control" id="description"
                                    placeholder="Enter Your Message" name="message"></textarea>
                            </div>
                            <div>
                            <div className=' d-flex justify-content-end'>
                                <button type="submit" className="btn btn-primary submit my-3 "><i className="fa fa-paper-plane"
                                        aria-hidden="true"></i> Send Message</button>
                            </div>
                            </div>

                        </div>
                    </div>
                </form>
            </div>
        </div>
        {/* <!-- end contact --> */}
    </div>
    </>
  )
}
