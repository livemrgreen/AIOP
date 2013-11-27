class CreateLessonTypes < ActiveRecord::Migration
  def change
    create_table :lesson_types do |t|
      t.string :label

      t.timestamps
    end
  end
end
