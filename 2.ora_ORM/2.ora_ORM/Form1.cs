using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Data.Entity;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace _2.ora_ORM
{
    public partial class Form1 : Form
    {
        StudentEntities context = new StudentEntities();
        public Form1()
        {
            InitializeComponent();

            context.Students.Load();

            studentBindingSource.DataSource = context.Students.Local;
        }

        private void bindingNavigator1_RefreshItems(object sender, EventArgs e)
        {
            
        }

        private void bindingNavigatorAddNewItem_Click(object sender, EventArgs e)
        {

        }

        private void toolStripButton1_Click(object sender, EventArgs e)
        {
            studentBindingSource.EndEdit();

            try
            {
                context.SaveChanges();
            }
            catch (Exception ex)
            {

                MessageBox.Show(ex.Message);
            }

            studentDataGridView.Refresh();
        }
    }
}
