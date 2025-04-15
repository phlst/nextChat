import Image from 'next/image';

function page() {
  return (
    <div>
      <Image src='/images/github.svg' width={50} height={50} alt='idk' />
    </div>
  );
}

export default page;
