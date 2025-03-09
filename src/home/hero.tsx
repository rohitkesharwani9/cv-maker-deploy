import type { NextPage } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';

const HeroHolder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 20px;

  & > * {
    flex-basis: 50%;
  }

  h3 {
    margin-bottom: -10px;
    font-weight: normal;
    text-align: center;
  }

  h1 {
    font-size: 2rem;
    margin-bottom: 2rem;
    text-align: center;
  }

  .cta-holder {
    display: flex;
    justify-content: center;
  }

  @media (min-width: 768px) {
    flex-direction: row;

    h3 {
      text-align: start;
    }

    h1 {
      font-size: 2.5rem;
      text-align: start;
    }

    .cta-holder {
      justify-content: flex-start;
    }
  }
`;

const CTA = styled.span`
  padding: 1.0rem 2rem;
  background: #6c63ff;
  color: white;
  border-radius: 4px;
  text-align: center;
  font-size: 2.2rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    padding: 0.8rem 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
    padding: 0.6rem 1.2rem;
  }
`;

const Hero: NextPage = () => {
  return (
    <HeroHolder>
      <div>
        <h3>Create and Download in PDF Format</h3>
        <h1>
          CV Maker Pro <br />
          Free Resume Builder
        </h1>
        <div className="cta-holder">
          <Link href="/editor">
            <a>
              <CTA>Start Making Your CV</CTA>
            </a>
          </Link>
        </div>
      </div>
      <Image src="/hiring.svg" alt="hiring" width="300px" height="300px" priority />
    </HeroHolder>
  );
};

export default Hero;
