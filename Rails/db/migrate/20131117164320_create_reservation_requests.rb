class CreateReservationRequests < ActiveRecord::Migration
  def change
    create_table :reservation_requests do |t|
      t.date :date
      t.string :status
      t.integer :capacity
      
      t.integer :teaching_id
      t.integer :time_slot_id
      t.integer :reservation_id

      t.timestamps
    end
  end
end
