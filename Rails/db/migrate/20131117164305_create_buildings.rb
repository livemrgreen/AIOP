class CreateBuildings < ActiveRecord::Migration
  def change
    create_table :buildings do |t|
      t.string :label

      t.timestamps
    end
  end
end
