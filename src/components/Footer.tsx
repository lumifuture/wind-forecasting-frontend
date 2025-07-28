// src/components/Footer.tsx

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-white border-t border-gray-200 text-gray-600 text-sm py-4 px-6 text-center mt-auto">
      <p>&copy; {currentYear} WindFlow Dashboard. All rights reserved.</p>
      <p className="mt-1">Powered by Advanced Wind Energy Analytics.</p>
    </footer>
  );
}

export default Footer;