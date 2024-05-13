import {
    Body,
    Button,
    Container,
    Head,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Row,
    Section,
    Text,
  } from "@react-email/components";
  import * as React from "react";
  
  interface AirbnbReviewEmailProps {
    authorName?: string;
    authorImage?: string;
    reviewText?: string;
  }
  
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "";
  
  export const ContactEmailTemplate = ({
    authorName,
    authorImage,
    reviewText,
  }: AirbnbReviewEmailProps) => {
    const previewText = `Read ${authorName}'s review`;
  
    return (
      <Html>
        <Head />
        <Preview>{previewText}</Preview>
  
        <Body style={main}>
          <Container style={container}>
            <Section>
              <Img
                src={`${baseUrl}/logo.png`}
                width="96"
                height="30"
                alt="Because of Maths"
              />
            </Section>
            <Section>
              <Img
                src={authorImage}
                width="96"
                height="96"
                alt={authorName}
                style={userImage}
              />
            </Section>
            <Section style={{ paddingBottom: "20px" }}>
              <Row>
                <Text style={heading}>Here's what {authorName} wrote</Text>
                <Text style={review}>{reviewText}</Text>
              </Row>
            </Section>
  
            <Hr style={hr} />
          </Container>
        </Body>
      </Html>
    );
  };
  
  export default ContactEmailTemplate;
  
  const main = {
    backgroundColor: "#ffffff",
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  };
  
  const container = {
    margin: "0 auto",
    padding: "20px 0 48px",
    width: "580px",
    maxWidth: "100%",
  };
  
  const userImage = {
    margin: "0 auto",
    marginBottom: "16px",
    borderRadius: "50%",
  };
  
  const heading = {
    fontSize: "32px",
    lineHeight: "1.3",
    fontWeight: "700",
    color: "#484848",
  };
  
  const paragraph = {
    fontSize: "18px",
    lineHeight: "1.4",
    color: "#484848",
  };
  
  const review = {
    ...paragraph,
    padding: "24px",
    backgroundColor: "#f2f3f3",
    borderRadius: "4px",
  };

  const hr = {
    borderColor: "#cccccc",
    margin: "20px 0",
  };
  
  
//   const button = {
//     backgroundColor: "#ff5a5f",
//     borderRadius: "3px",
//     color: "#fff",
//     fontSize: "18px",
//     paddingTop: "19px",
//     paddingBottom: "19px",
//     textDecoration: "none",
//     textAlign: "center" as const,
//     display: "block",
//     width: "100%",
//   };
  
//   const link = {
//     ...paragraph,
//     color: "#ff5a5f",
//     display: "block",
//   };
  
//   const reportLink = {
//     fontSize: "14px",
//     color: "#9ca299",
//     textDecoration: "underline",
//   };
  
  
//   const footer = {
//     color: "#9ca299",
//     fontSize: "14px",
//     marginBottom: "10px",
//   };