import { Clover } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const navLinks = ["Home", "About us", "Services", "Gallery", "Insights", "Contact"];
const contactItems = ["Da Nang, Vietnam", "hello@alvie.vn", "+84 xxx xxx xxx"];
const socialLinks = ["Instagram", "LinkedIn", "Behance", "Facebook"];

const FooterLink = ({
  children,
  href,
  hoverColor = "rgba(247,244,235,1)",
}: {
  children: string;
  href?: string;
  hoverColor?: string;
}) => (
  <a
    href={href || "#"}
    style={{
      display: "block",
      fontFamily: "var(--font-body)",
      fontWeight: 300,
      fontSize: 14,
      color: "rgba(247,244,235,0.45)",
      textDecoration: "none",
      transition: "color 300ms ease, transform 300ms ease",
      cursor: "pointer",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.color = hoverColor;
      e.currentTarget.style.transform = "translateX(4px)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.color = "rgba(247,244,235,0.45)";
      e.currentTarget.style.transform = "translateX(0)";
    }}
  >
    {children}
  </a>
);

const ColumnHeader = ({ children }: { children: string }) => (
  <p
    style={{
      fontFamily: "var(--font-body)",
      fontWeight: 500,
      fontSize: 11,
      color: "#D49A5A",
      textTransform: "uppercase",
      letterSpacing: 2,
      marginBottom: 16,
    }}
  >
    {children}
  </p>
);

const Footer = () => {
  const isMobile = useIsMobile();

  return (
    <footer
      style={{
        position: "relative",
        zIndex: 15,
        background: "radial-gradient(ellipse at center, #0F3D33 0%, #0A2E26 70%)",
        color: "#F7F4EB",
      }}
    >
      {/* Gradient blend from canvas */}
      <div
        style={{
          position: "absolute",
          top: -60,
          left: 0,
          right: 0,
          height: 60,
          background: "linear-gradient(to bottom, transparent, #0A2E26)",
          pointerEvents: "none",
        }}
      />

      {/* TIER 1: Brand + Navigation */}
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: isMobile ? "64px 24px 0" : "80px 24px 0",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1.2fr 0.8fr 1fr",
          gap: isMobile ? 48 : 32,
          textAlign: isMobile ? "center" : "left",
        }}
      >
        {/* Brand */}
        <div>
          <p
            className="font-display font-bold"
            style={{ fontSize: 28, color: "#F7F4EB", marginBottom: 4 }}
          >
            ALVIE
          </p>
          <p
            className="font-body"
            style={{
              fontWeight: 300,
              fontStyle: "italic",
              fontSize: 14,
              color: "rgba(247,244,235,0.4)",
              marginBottom: 20,
            }}
          >
            To not just exist.
          </p>
          <p
            className="font-body"
            style={{
              fontWeight: 300,
              fontSize: 13,
              color: "rgba(247,244,235,0.25)",
              maxWidth: isMobile ? "none" : 240,
              margin: isMobile ? "0 auto" : undefined,
              lineHeight: 1.7,
            }}
          >
            Strategic digital solutions for businesses ready to be truly seen.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <ColumnHeader>Navigation</ColumnHeader>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {navLinks.map((link) => (
              <FooterLink key={link}>{link}</FooterLink>
            ))}
          </div>
        </div>

        {/* Contact + Follow */}
        <div>
          <ColumnHeader>Contact</ColumnHeader>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {contactItems.map((item) => {
              const isEmail = item.includes("@");
              return (
                <FooterLink
                  key={item}
                  href={isEmail ? `mailto:${item}` : undefined}
                  hoverColor={isEmail ? "#D49A5A" : "rgba(247,244,235,1)"}
                >
                  {item}
                </FooterLink>
              );
            })}
          </div>

          <div style={{ marginTop: 32 }}>
            <ColumnHeader>Follow</ColumnHeader>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {socialLinks.map((link) => (
                <FooterLink key={link} hoverColor="#D49A5A">
                  {link}
                </FooterLink>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* TIER 2: Closing Quote */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>
        <div
          style={{
            height: 1,
            background: "rgba(247,244,235,0.08)",
            marginTop: 48,
            marginBottom: 48,
          }}
        />
        <p
          className="font-body"
          style={{
            fontWeight: 300,
            fontStyle: "italic",
            fontSize: "clamp(15px, 1.6vw, 18px)",
            color: "rgba(247,244,235,0.4)",
            textAlign: "center",
            maxWidth: 480,
            margin: "0 auto",
            lineHeight: 1.75,
          }}
        >
          Every business has a story worth telling beautifully. We're here to help
          you tell yours.
        </p>
        <div
          style={{
            height: 1,
            background: "rgba(247,244,235,0.08)",
            marginTop: 48,
            marginBottom: 0,
          }}
        />
      </div>

      {/* TIER 3: Copyright */}
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "32px 24px",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: isMobile ? 8 : 0,
          textAlign: "center",
        }}
      >
        <p
          className="font-body"
          style={{ fontWeight: 300, fontSize: 12, color: "rgba(247,244,235,0.2)" }}
        >
          © 2025 ALVIE{" "}
          <span style={{ color: "rgba(212,154,90,0.2)", margin: "0 4px" }}>·</span> Da
          Nang, Vietnam
        </p>
        <p
          className="font-body"
          style={{ fontWeight: 300, fontSize: 12, color: "rgba(247,244,235,0.2)" }}
        >
          Crafted with purpose
        </p>
      </div>

      {/* Final icon */}
      <div style={{ textAlign: "center", paddingBottom: 32 }}>
        <Clover size={20} style={{ color: "#D49A5A", opacity: 0.15 }} />
      </div>
    </footer>
  );
};

export default Footer;
