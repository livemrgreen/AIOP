class CreateRooms < ActiveRecord::Migration
  def change
    create_table :rooms do |t|
      t.string :label
      t.integer :capacity
      t.integer :building_id

      t.timestamps
    end
  end
end
