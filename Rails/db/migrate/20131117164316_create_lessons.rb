class CreateLessons < ActiveRecord::Migration
  def change
    create_table :lessons do |t|
      t.string :label
      t.integer :lesson_type_id
      t.integer :subject_id

      t.timestamps
    end
  end
end
