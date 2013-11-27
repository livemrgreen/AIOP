class AddedCharacteristicsRoomsTable < ActiveRecord::Migration
  def change
  	create_table :characteristics_rooms do |t|
  		t.integer :room_id
  		t.integer :characteristic_id

  		t.timestamps
  	end
  end
end
