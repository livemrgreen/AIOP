class CreateTeachings < ActiveRecord::Migration
  def change
    create_table :teachings do |t|
      t.integer :group_id
      t.integer :lesson_id
      t.integer :teacher_id
      t.integer :reservation_id

      t.timestamps
    end
  end
end
