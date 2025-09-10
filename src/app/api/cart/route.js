import dbConnect from "@/lib/mongodb";
import Cart from "@/models/Cart";

export async function GET() {
  await dbConnect();
  const cart = await Cart.find({ userId: "guest" }).populate("productId");
  return Response.json(cart);
}


export async function POST(req) {
  await dbConnect();
  const { userId, productId, quantity } = await req.json();

  const existing = await Cart.findOne({ userId, productId });
  if (existing) {
    existing.quantity += quantity;
    await existing.save();
    return Response.json(existing);
  }

  const cartItem = await Cart.create({ userId, productId, quantity });
  return Response.json(cartItem);
}


export async function DELETE(req) {
  await dbConnect();
  const { cartId } = await req.json();
  await Cart.findByIdAndDelete(cartId);
  return Response.json({ message: "Item removed" });
}
