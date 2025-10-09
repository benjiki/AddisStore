import { auth } from "@clerk/nextjs/server";

const TestPage = async () => {
  const { getToken } = await auth();
  const token = await getToken();
  console.log(token);
  //  products responce
  const resProducts = await fetch("http://localhost:8000/test", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const resOrders = await fetch("http://localhost:8001/test", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const resPayment = await fetch("http://localhost:8002/test", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const Productdata = await resProducts.json();
  const Orderdata = await resOrders.json();
  const Paymentdata = await resPayment.json();
  console.log(Productdata);
  console.log(Orderdata);
  console.log(Paymentdata);

  return <div className="">TestPage</div>;
};

export default TestPage;
