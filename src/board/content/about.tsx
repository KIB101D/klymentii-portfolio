export function AboutContent() {
  return (
    <>
      <p className="eyebrow">About</p>
      <div className="avatar">&lt;/&gt;</div>
      <p className="bio">
        Frontend Developer based in Alicante, Spain, with hands-on experience in
        React, Next.js, TypeScript, SCSS, Tailwind CSS, REST APIs, and CMS
        platforms. I build responsive interfaces, search and filtering flows,
        localized experiences, and maintainable component architecture.
      </p>
      <div className="pills">
        {[
          "React",
          "Next.js",
          "TypeScript",
          "SCSS",
          "Tailwind CSS",
          "REST API",
          "Strapi CMS",
          "i18n",
        ].map((pill) => (
          <span className="pill" key={pill}>
            {pill}
          </span>
        ))}
      </div>
    </>
  );
}
