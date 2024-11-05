import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { ProfileFormData } from '../../schemas/profile.schema';
import { formatDate } from '../../utils/date';

interface ProfilePDFProps {
  profile: ProfileFormData;
}

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  section: {
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  heading: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  field: {
    marginBottom: 5,
    fontSize: 12,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 5,
  },
});

export const ProfilePDF = ({ profile }: ProfilePDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Profile Information</Text>
      </View>

      {/* Personal Information */}
      <View style={styles.section}>
        <Text style={styles.heading}>Personal Information</Text>
        <Text style={styles.field}>
          <Text style={styles.label}>Name:</Text> {profile.name}
        </Text>
        <Text style={styles.field}>
          <Text style={styles.label}>Email:</Text> {profile.email}
        </Text>
        <Text style={styles.field}>
          <Text style={styles.label}>Contact:</Text> {profile.contact}
        </Text>
        <Text style={styles.field}>
          <Text style={styles.label}>Address:</Text> {profile.address}
        </Text>
      </View>

      {/* Education */}
      <View style={styles.section}>
        <Text style={styles.heading}>Education</Text>
        <Text style={styles.field}>
          <Text style={styles.label}>Degree:</Text> {profile.education.degree}
        </Text>
        <Text style={styles.field}>
          <Text style={styles.label}>Completion Year:</Text> {profile.education.completionYear}
        </Text>
      </View>

      {/* Additional Information */}
      <View style={styles.section}>
        <Text style={styles.heading}>Additional Information</Text>
        <Text style={styles.field}>
          <Text style={styles.label}>Student Card:</Text> {profile.studentCard}
        </Text>
        <Text style={styles.field}>
          <Text style={styles.label}>Expiry Date:</Text> {formatDate(profile.expiryDate)}
        </Text>
      </View>

      {/* Professional Links */}
      {(profile.portfolio || profile.githubLink) && (
        <View style={styles.section}>
          <Text style={styles.heading}>Professional Links</Text>
          {profile.portfolio && (
            <Text style={styles.field}>
              <Text style={styles.label}>Portfolio:</Text> {profile.portfolio}
            </Text>
          )}
          {profile.githubLink && (
            <Text style={styles.field}>
              <Text style={styles.label}>GitHub:</Text> {profile.githubLink}
            </Text>
          )}
        </View>
      )}
    </Page>
  </Document>
); 