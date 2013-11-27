class CreateTimeSlots < ActiveRecord::Migration
  def change
    create_table :time_slots do |t|
      t.string :start
      t.string :end

      t.timestamps
    end
  end
end
