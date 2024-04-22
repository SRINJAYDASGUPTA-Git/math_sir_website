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
import Footer from "./Footer";
  
  interface ReviewEmailProps {
    authorName?: string;
    authorImage?: string;
    reviewText?: string;
  }
  
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "";
  
  export const ReviewEmail = ({
    authorName,
    authorImage,
    reviewText,
  }: ReviewEmailProps) => {
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
                alt="BoM"
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
            <Footer />
          </Container>
        </Body>
      </Html>
    );
  };
  
  export default ReviewEmail;
  
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