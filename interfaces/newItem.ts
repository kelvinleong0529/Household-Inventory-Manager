export interface NewItem {
    user_id: number
    item_name: string
    item_category: string
    current_quantity: number
    alert_quantity: number
    expiry_date: Date
}