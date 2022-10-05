export default mongoose => {
    const Cart = mongoose.model(
        "cart",
        mongoose.Schema(
            {
                userId: String,
                status: String,
                notificationCount: Number
            },
            { timestamps: true }
        )
    );
    return Cart;
};
