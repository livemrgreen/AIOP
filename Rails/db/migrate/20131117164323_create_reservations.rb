class CreateReservations < ActiveRecord::Migration
  def change
    create_table :reservations do |t|
      t.date :date
      t.integer :time_slot_id
      t.integer :room_id
      t.integer :teaching_id
      t.integer :reservation_request_id

      t.timestamps
    end
  end
end
