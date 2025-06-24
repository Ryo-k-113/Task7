import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header className="font-bold bg-stone-800 p-6 flex justify-between mx-auto items-center">
      <h1 className="logo text-white">
        <Link to="/">Blog</Link>
      </h1>
      <nav>
        <ul>
          <li className="text-white">
            <Link to="/contact">お問い合わせ</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}