const SIZES = {
  sm: 28,
  md: 40,
  lg: 64,
};

function ZapIcon({ px }) {
  return (
    <svg viewBox="0 0 24 24" width={px * 0.55} height={px * 0.55} fill="currentColor">
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
    </svg>
  );
}

function CartIcon({ px }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={px * 0.55}
      height={px * 0.55}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="9" cy="21" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="19" cy="21" r="1.2" fill="currentColor" stroke="none" />
      <path d="M2 3h3l2.6 13.2a2 2 0 0 0 2 1.6h9.4a2 2 0 0 0 2-1.6L23 8H6.2" />
    </svg>
  );
}

export default function CompanyBadge({ company, size = 'md' }) {
  const px = SIZES[size];
  return (
    <span
      className={`company-badge company-badge--${company} company-badge--${size}`}
      style={{ width: px, height: px }}
    >
      {company === 'zoomeats' ? <ZapIcon px={px} /> : <CartIcon px={px} />}
    </span>
  );
}
