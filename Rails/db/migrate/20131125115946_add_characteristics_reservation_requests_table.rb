class AddCharacteristicsReservationRequestsTable < ActiveRecord::Migration
  def change
  	create_table :characteristics_reservation_requests do |t|
  		t.integer :characteristic_id
  		t.integer :reservation_request_id

  		t.timestamps
  	end
  end
end
